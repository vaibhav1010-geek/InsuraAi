import express from "express";
import admin from "../config/firebase.js";
import User from "../models/user.js";

const router = express.Router();

router.post("/sync", async(req, res) => {
  const { token } = req.body;

  if(!token) return res.status(400).json({error: "Token required"});

  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    const { uid, email, name : tokenName } = decodedValue;

    let user = await User.findOne({uid});

    if(!user) {
      user = await User.findOne({email});

      if(user) {
        user.uid = uid;
        await user.save(); 
      } else {
        user = await User.create({
          uid, 
          email,
          name: req.body.name || tokenName || email.split("@")[0],
        });
      }
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: "Authentication sync failed"});
  }
});

export default router;