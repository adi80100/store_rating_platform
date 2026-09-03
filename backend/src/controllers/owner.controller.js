import Store from "../models/store.models.js";
import Rating from "../models/rating.models.js";
import User from "../models/user.models.js";

export const ownerDashboard = async (req, res) => {
  try {
    const store = await Store.findOne({
      where: {
        ownerId: req.user.id,
      },
    });

    if (!store) {
      return res.status(404).json({
        success: false,
        message: "Store not found",
      });
    }


    const ratings = await Rating.findAll({
      where: {
        storeId: store.id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["name", "email"],
        },
      ],
    });


    let averageRating = 0;

    if (ratings.length > 0) {
      const total = ratings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );

      averageRating = total / ratings.length;
    }


    let users = ratings.map((rating) => ({
      name: rating.user.name,
      email: rating.user.email,
      rating: rating.rating,
    }));

  

    const allowedSortFields = [
      "name",
      "email",
      "rating",
    ];

    const sortBy = allowedSortFields.includes(req.query.sortBy)
      ? req.query.sortBy
      : "name";

    const order =
      req.query.order?.toUpperCase() === "DESC"
        ? "DESC"
        : "ASC";

    users.sort((a, b) => {
      if (sortBy === "rating") {
        return order === "ASC"
          ? a.rating - b.rating
          : b.rating - a.rating;
      }

      const valueA = a[sortBy].toLowerCase();
      const valueB = b[sortBy].toLowerCase();

      if (valueA < valueB) {
        return order === "ASC" ? -1 : 1;
      }

      if (valueA > valueB) {
        return order === "ASC" ? 1 : -1;
      }

      return 0;
    });

    return res.status(200).json({
      success: true,

      store: {
        id: store.id,
        name: store.name,
        address: store.address,
        averageRating: Number(averageRating.toFixed(1)),
      },

      users,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};