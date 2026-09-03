import bcrypt from "bcrypt";
import User from "./src/models/user.models.js";
import { sequelize } from "./src/db/db.js";

const createAdmin = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");


    const existingAdmin = await User.findOne({
      where: {
        email: "platform.admin@storerating.com",
      },
    });

    if (existingAdmin) {
            console.log("Admin already exists");

      return;
    }

    const hashedPassword = await bcrypt.hash("Admin@2026", 10);

    await User.create({
      name: "System Administrator Platform",
      email: "platform.admin@storerating.com",
      password: hashedPassword,
      address: "100 Business Park, Pune, Maharashtra, India",
      role: "admin",
    });


  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    await sequelize.close();
  }
};

createAdmin();