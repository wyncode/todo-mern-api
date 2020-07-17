const passport = require('passport'),
  JwtStrategy = require('passport-jwt').Strategy,
  User = require('../../db/models/user'),
  ExtractJwt = require('passport-jwt').ExtractJwt;

// ******************************
// JWT Strategy
// ******************************
let jwtOptions = {
  jwtFromRequest: (req) => {
    return req?.cookies?.jwt || ExtractJwt.fromAuthHeaderWithScheme('jwt')(req);
  },
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  'jwt',
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
      return done(null, false, { message: 'jwt expired' });
    }
    let { iat, exp, ...userData } = jwtPayload;
    user = await User.findById(userData._id);
    user = user.toObject();
    delete user.password;
    delete user.tokens;
    userData = user;
    return done(null, userData);
  })
);

module.exports = passport;
