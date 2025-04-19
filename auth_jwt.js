const passport      = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User          = require('./Users');

const opts = {
  // now expects header: Authorization: Bearer <token>
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey:    process.env.JWT_SECRET
};

passport.use(new JwtStrategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    return user
      ? done(null, user)
      : done(null, false);
  } catch (err) {
    return done(err, false);
  }
}));

// exports a middleware you can apply to any route
exports.isAuthenticated = passport.authenticate('jwt', { session: false });
