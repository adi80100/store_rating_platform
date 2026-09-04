import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  try {

    
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized request",
      });
    }

    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decodedToken;

    next();

  } catch (error) {
  console.error(error);
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};