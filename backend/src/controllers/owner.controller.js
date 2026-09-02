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
    });

    let averageRating = 0;

    if (ratings.length > 0) {

      const total = ratings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );

      averageRating = total / ratings.length;
    }

    const users = [];

    for (const rating of ratings) {

      const user = await User.findByPk(rating.userId);

      users.push({
        name: user.name,
        email: user.email,
        rating: rating.rating,
      });

    }

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