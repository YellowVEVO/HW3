var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('./Users'); // Ensure this is pointing to the correct file
require('dotenv').config(); // Load environment variables from .env file

// Setting up options for passport JWT strategy
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = process.env.SECRET_KEY; // Make sure this is defined in your .env file

// Define the strategy for passport
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    console.log("JWT Payload:", jwt_payload); // Log the payload for debugging
    try {
        const user = await User.findById(jwt_payload.id); // Find user by ID from payload
        if (user) {
            return done(null, user); // Pass user info to the request if found
        } else {
            return done(null, false); // If no user found, return false
        }
    } catch (err) {
        console.error("Error in finding user by ID:", err); // Log any error that occurs
        return done(err, false); // Return the error
    }
}));

// Export isAuthenticated middleware to be used in routes
exports.isAuthenticated = passport.authenticate('jwt', { session: false });
exports.secret = opts.secretOrKey;