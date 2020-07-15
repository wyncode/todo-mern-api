const passport = require('passport'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;

// ******************************
// JWT Strategy
// ******************************
let jwtOptions = {
  jwtFromRequest: (req) => {
    return (
      req?.cookies?.jwt || ExtractJwt.fromAuthHeaderWithScheme('mern')(req)
    );
  },
  secretOrKey: process.env.JWT_SECRET
};

passport.use(
  'mern',
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.expires) {
      return done(null, false, { message: 'jwt expired' });
    }
    let { iat, exp, ...userData } = jwtPayload;
    return done(null, userData);
  })
);

module.exports = passport;
