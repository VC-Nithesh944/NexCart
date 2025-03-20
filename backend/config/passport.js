//query: To create google auth stratergy

const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth20').Strategy;
const Users = require('../models/Users');
const User = require('../models/Users');
require('dotenv').config;

// 🔹 Configure Passport Google Strategy
passport.use(new GoogleStratergy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL : "http://localhost:5000/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) =>{
        try{
            let user = await Users.findOne({ googleId : profile.id });

            if(!user){
                user = new User({
                    googleId : profile.id,
                    username : profile.displayName,
                    email : profile.email[0].value,
                    avatar : profile.photo[0].value
                });
                await user.save();
            }
            return done(null, user);
        }
        catch(error) {
            return done(err, null);
        }
    }
));

// 🔹 Serialize & Deserialize User (for session storage)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser( async(id , done) => {
    const user = await User.findById(id) ;
    done(null, user);
});
