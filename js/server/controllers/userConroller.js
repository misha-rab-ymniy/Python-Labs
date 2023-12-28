const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../models/models');
const {OAuth2Client} = require("google-auth-library");

const generateJwt = (id, email, role) => {
  return jwt.sign(
    {id: id, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '5d'},
  );
};

const client = new OAuth2Client({
  clientId: '718631301816-rdre3a1tnherad3qjip2208tsbripm51.apps.googleusercontent.com',
});

class UserController {
  async registration(req, res, next) {
    const {name, email, password} = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Invalid email or password'));
    }
    const candidate = await User.findOne({where: {email}});
    if (candidate) {
      return next(ApiError.badRequest('This email is already used'));
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({name, email, role: 'USER', password: hashPassword});

    const token = generateJwt(user.id, user.email, user.role);

    return res.json({token});
  }

  async login(req, res, next) {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    if (!user) {
      return next(ApiError.notFound('User not found'));
    }
    let isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return next(ApiError.badRequest('Wrong password'));
    }

    const token = generateJwt(user.id, user.email, user.role);
    return res.json({token});
  }

  async signInGoogle(req, res, next) {
    try {
      const idToken = req.body.token;
      const ticket = await client.verifyIdToken({idToken});

      const {email, family_name, given_name} = ticket.getPayload();

      const user = await User.findOne({where: {email}});

      if (user) {
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
      }

      const newUser = await User.create({email, name: `${given_name} ${family_name}`, password: 'google'});
      const token = generateJwt(newUser.id, newUser.email, newUser.role);
      return res.json({token});
    } catch (e) {
      next(e);
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({token});
  }
}

module.exports = new UserController();
