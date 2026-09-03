import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import { connectDB, sequelize } from "./db/db.js";


import "./models/user.models.js";
import "./models/store.models.js";
import "./models/rating.models.js";

connectDB()
  .then(async () => {

    await sequelize.sync();

    app.listen(process.env.PORT || 8000, () => {
      console.log(` App is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log(" Database connection failed");
    console.log(error);
  });