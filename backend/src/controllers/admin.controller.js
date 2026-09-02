import bcrypt from "bcrypt";
import User from "../models/user.models.js";
import Store from "../models/store.models.js";
import Rating from "../models/rating.models.js";
import { Op, Sequelize } from "sequelize";

export const addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    // required fields
    if (!name || !email || !password || !address || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // name validation
    if (name.length < 20 || name.length > 60) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 20 and 60 characters",
      });
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be 8-16 characters with one uppercase and one special character",
      });
    }

    // address validation
    if (address.length > 400) {
      return res.status(400).json({
        success: false,
        message: "Address cannot exceed 400 characters",
      });
    }

    // role validation
    if (!["admin", "user", "owner"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    // check existing user
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User added successfully",
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addStore = async (req, res) => {
  try {

    const { name, email, address, ownerId } = req.body;

    // Required fields
    if (!name || !email || !address || !ownerId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    console.log("ownerId:", ownerId);

    const users = await User.findAll();
    console.log(users);

    // Check owner exists
    const owner = await User.findByPk(ownerId);

    if (!owner) {
      return res.status(404).json({
        success: false,
        message: "Store owner not found",
      });
    }

    // Owner role = owner
    if (owner.role !== "owner") {
      return res.status(400).json({
        success: false,
        message: "Selected user is not a store owner",
      });
    }

    // Email already exists
    const existingStore = await Store.findOne({
      where: { email },
    });

    if (existingStore) {
      return res.status(400).json({
        success: false,
        message: "Store already exists",
      });
    }

    // Create Store
    const store = await Store.create({
      name,
      email,
      address,
      ownerId,
    });

    return res.status(201).json({
      success: true,
      message: "Store created successfully",
      store,
    });

  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const getDashboard = async (req, res) => {
  try {

    const totalUsers = await User.count();

    const totalStores = await Store.count();

    const totalRatings = await Rating.count();

    return res.status(200).json({
      success: true,
      dashboard: {
        totalUsers,
        totalStores,
        totalRatings,
      },
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};



export const getAllUsers = async (req, res) => {
  try {

    const {name,email,address,role,sortBy = "name",order = "ASC",} = req.query;
    const where = {};

    // Only admin and user should be shown
    // where.role = {
    // [Op.in]: ["admin", "user"]
    // };

    if (name) {
      where.name = {
        [Op.like]: `%${name}%`
      };
    }

    if (email) {
      where.email = {
        [Op.like]: `%${email}%`
      };
    }

    if (address) {
      where.address = {
        [Op.like]: `%${address}%`
      };
    }

    if (role) {
      where.role = role;
    }

    const users = await User.findAll({
        where,
        attributes: ["id", "name", "email", "address", "role"],
        order: [[sortBy, order]],
    });

    return res.status(200).json({
      success: true,
      users,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};





export const getAllStores = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      sortBy = "name",
      order = "ASC",
    } = req.query;

    const where = {};

    if (name) {
      where.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (email) {
      where.email = {
        [Op.like]: `%${email}%`,
      };
    }

    if (address) {
      where.address = {
        [Op.like]: `%${address}%`,
      };
    }

    // Allowed sorting fields
    const allowedSortFields = [
      "name",
      "email",
      "address",
      "rating",
    ];

    const safeSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : "name";

    const safeOrder =
      order.toUpperCase() === "DESC"
        ? "DESC"
        : "ASC";

    let orderClause;

    if (safeSortBy === "rating") {
      orderClause = [
        [
          Sequelize.fn(
            "COALESCE",
            Sequelize.fn("AVG", Sequelize.col("ratings.rating")),
            0
          ),
          safeOrder,
        ],
      ];
    } else {
      orderClause = [[safeSortBy, safeOrder]];
    }

    const stores = await Store.findAll({
      where,

      attributes: [
        "id",
        "name",
        "email",
        "address",
        [
          Sequelize.fn(
            "COALESCE",
            Sequelize.fn("AVG", Sequelize.col("ratings.rating")),
            0
          ),
          "rating",
        ],
      ],

      include: [
        {
          model: Rating,
          as: "ratings",
          attributes: [],
          required: false,
        },
      ],

      group: ["Store.id"],

      order: orderClause,
    });

    const storeList = stores.map((store) => ({
      id: store.id,
      name: store.name,
      email: store.email,
      address: store.address,
      rating: Number(
        Number(store.dataValues.rating).toFixed(1)
      ),
    }));

    return res.status(200).json({
      success: true,
      stores: storeList,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getUserDetails = async (req, res) => {

    try {

        const { id } = req.params;

        const user = await User.findByPk(id,{
            attributes:[
                "id",
                "name",
                "email",
                "address",
                "role"
            ]
        });

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            });
        }

        let ownerRating = null;

        if(user.role==="owner"){

            const store = await Store.findOne({
                where:{
                    ownerId:user.id
                }
            });

            if(store){

                const ratings = await Rating.findAll({
                    where:{
                        storeId:store.id
                    }
                });

                if(ratings.length>0){

                    const total = ratings.reduce(
                        (sum,rating)=>sum+rating.rating,
                        0
                    );

                    ownerRating = total/ratings.length;
                }

            }

        }

        // return res.status(200).json({
        //     success:true,
        //     user,
        //     rating:ownerRating
        // });
        return res.status(200).json({
          success: true,
          user: {
              ...user.toJSON(),
              averageRating: ownerRating
          }
      });

    } catch (error) {

        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

}

