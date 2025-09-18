import passport from "passport";
import { Strategy as GoogleStrategy }from "passport-google-oauth20"
import User from "../models/userModel.js";

async function findOrCreateUser(profile){
    const email=profile.emails?.[0].value;
    const name=profile.displayName;
    let user=await User.findOne({email});
    if(!user){
        user=await User.create({
            email:email,
            name:name,
            password:Date.now().toString()
        })
    }
    return user;
};

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/api/oauth/google/callback"
  },
  async function(accessToken,refreshToken,profile,cb) {
    const user=await findOrCreateUser(profile);
    return cb(null,user);
  }
));