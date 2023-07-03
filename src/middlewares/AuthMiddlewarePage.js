import jwt from "jsonwebtoken";
import { auth } from "../config/auth.js";
import { promisify } from "util";

export default async (req, res, next) => {
  var authorization = req.headers.authorization;

  if (!authorization && req.cookies.token){
    console.log(req.cookies);
    authorization = req.cookies.token;
  }

  if (!authorization) {
    return res.redirect("/users/page/login");
  }

  const token = authorization.split(" ")[1];

  try {
    const decoded = await promisify(jwt.verify)(token, auth.secret);
    if (!decoded) {
      return res.redirect("/users/page/login");;
    } else {
      req.user_id = decoded.id;
      next();
    }
  } catch {
    return res.redirect("/users/page/login");
  }
};
