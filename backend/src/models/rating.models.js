import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import User from "./user.models.js";
import Store from "./store.models.js";

const Rating = sequelize.define("Rating",{
    
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
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
        fields: ["userId", "storeId"]
      }
    ]
  },
  
    
  
  
);

export default Rating;