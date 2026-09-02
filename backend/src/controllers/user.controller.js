import { Op, Sequelize } from "sequelize";
import Store from "../models/store.models.js";
import Rating from "../models/rating.models.js";

export const getAllStores = async (req, res) => {
  try {
    const {
      name,
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

    if (address) {
      where.address = {
        [Op.like]: `%${address}%`,
      };
    }

    // Allowed sorting fields
    const allowedSortFields = [
      "name",
      "address",
      "overallRating",
    ];

    const safeSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : "name";

    const safeOrder =
      order.toUpperCase() === "DESC"
        ? "DESC"
        : "ASC";

    let orderClause;

    if (safeSortBy === "overallRating") {
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
        "address",
        [
          Sequelize.fn(
            "COALESCE",
            Sequelize.fn("AVG", Sequelize.col("ratings.rating")),
            0
          ),
          "overallRating",
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


    const userRatings = await Rating.findAll({
      where: {
        userId: req.user.id,
      },
      attributes: ["storeId", "rating"],
    });


    const userRatingMap = {};

    userRatings.forEach((rating) => {
      userRatingMap[rating.storeId] = rating.rating;
    });

    const storeList = stores.map((store) => ({
      id: store.id,
      name: store.name,
      address: store.address,

      overallRating: Number(
        Number(store.dataValues.overallRating).toFixed(1)
      ),

      userRating:
        userRatingMap[store.id] !== undefined
          ? userRatingMap[store.id]
          : null,
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

export const submitRating = async (req, res) => {
  try {

    const { storeId, rating } = req.body;

    if (!storeId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Store ID and Rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const store = await Store.findByPk(storeId);

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }

    const existingRating = await Rating.findOne({
      where: {
        userId: req.user.id,
        storeId,
      },
    });

    if (existingRating) {
      return res.status(400).json({
        success: false,
        message: "You have already rated this store",
      });
    }

    const newRating = await Rating.create({
      userId: req.user.id,
      storeId,
      rating,
    });

    return res.status(201).json({
      success: true,
      message: "Rating submitted successfully",
      rating: newRating,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

export const updateRating = async (req, res) => {
  try {

    const { storeId, rating } = req.body;
    

    if (!storeId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Store ID and Rating are required",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    const existingRating = await Rating.findOne({
      where: {
        userId: req.user.id,
        storeId,
      },
    });

    if (!existingRating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found",
      });
    }

    existingRating.rating = rating;

    await existingRating.save();

    return res.status(200).json({
      success: true,
      message: "Rating updated successfully",
      rating: existingRating,
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};