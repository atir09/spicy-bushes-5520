

let UserModel = require("./models/userModel");
const passport = require("passport");



var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: "258214568243-pgcqgv1k62hugjirf9qtik8v519hsctm.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://rich-plum-barracuda-fez.cyclic.app/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    
    // const user = new UserModel({name:profile._json.name,email:profile._json.email,password:"123"});
    // await user.save()
    return cb(null, "user");
  }
));

module.exports={passport};