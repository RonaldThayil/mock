const passport = require("passport");
const config = require("../config/configuration");
const { user } = require("../controllers");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.goggleLogin.GOOGLE_CLIENT_ID,
      clientSecret: config.goggleLogin.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:9000/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      //Profile ID from google

      return done(null, profile);
    }
  )
);
