import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    try {
       // console.log("protectRoute: checking for token...");
        const token = req.cookies.jwt;
      //  console.log("protectRoute: token =", token);

        if (!token) {
           // console.log("protectRoute: No token found");
            return res.status(401).json({ message: "Unauthorized - No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //  console.log("protectRoute: decoded =", decoded);

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
          //  console.log("protectRoute: User not found");
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
       // console.log("protectRoute: User authenticated");
        next();
    } catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        res.status(401).json({ message: "Unauthorized - Invalid or Expired Token" });
    }
};
