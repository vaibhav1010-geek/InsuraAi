import admin from "../config/firebase.js";
import User from "../models/user.js";

const authMiddleware = async(req, res, next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = await admin.auth().verifyIdToken(token);
      const { uid, email } = decodedToken;

      let user = await User.findOne({uid});

      if(!user) {
        user = await User.findOne({email});
        if(user) {
          user.uid = uid;
          await user.save();
        }
      }

      if(!user) {
        return res.status(401).json({error: "User record not found in database."});
      }

      req.user = user;
      next();
    } catch (err) {
      console.log("Auth err: ", err);
      return res.status(401).json({error: "Not authorized, token failed"});
    }
  } else {
    return res.status(401).json({error: "Not authorized, no token"});
  }
};

export default authMiddleware;