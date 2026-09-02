import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

const Rating = sequelize.define(
  "Rating",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: "Rating must be an integer",
        },
        min: {
          args: [1],
          msg: "Rating must be at least 1",
        },
        max: {
          args: [5],
          msg: "Rating cannot exceed 5",
        },
      },
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    storeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "ratings",
    timestamps: true,

    indexes: [
      {
        unique: true,
        fields: ["userId", "storeId"],
      },
    ],
  }
);

export default Rating;