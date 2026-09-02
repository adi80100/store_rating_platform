import jwt from "jsonwebtoken";

export const verifyJWT = (req, res, next) => {
  try {

    console.log(req.headers);
    console.log(req.header("Authorization"));
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

    console.log(req.user)
    next();

  } catch (error) {
    console.log(error)
    return res.status(401).json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};