import jwt from "jsonwebtoken";
import { JWT_ACCESS_SECRET } from "../config";
const authorization = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if(typeof authHeader === "undefined"){
    res.status(403).json({href:"/login"});
  }  
  const authorization = authHeader.split(" ")[1]|| authHeader;

  if (typeof authorization === "undefined" || !authorization) {
    res.status(401);
    throw new Error("Unauthorized 1");
  }
  jwt.verify(authorization, JWT_ACCESS_SECRET, (error: any, decoded: any) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401);
        throw new Error("Token Expired");
      } else {
        res.status(403);
        throw new Error("invalid token");
      }
    }
    if (typeof decoded.id === "undefined") {
      res.status(403).json({href:"/login"});
    }
    req.user = decoded;
    next();
  });
};
export default authorization;
