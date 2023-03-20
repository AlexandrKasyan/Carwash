const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Role } = require('../models/models')

const generateJwt = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  )
}

class UserController {
  async registration(req, res) {
    let { email, password, roleId } = req.body;
    roleId = roleId || 1;
    if (!email || !password) {
      return next(ApiError.badRequest('Не корректно введен email или пароль'))
    }
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return next(ApiError.badRequest('Этот email уже используется'))
    }

    const hashPassword = await bcrypt.hash(password, 5)

    const user = await User.create({ email, password: hashPassword, roleId })
    const { role } = await Role.findOne({ where: { id: roleId } });
    const token = generateJwt(user.id, user.email, role)
    return res.json({ token })
  }
  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return next(ApiError.badRequest('email не верно указан'))
    }
    const { role } = await Role.findOne({ where: { id: user.roleId } });
    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.badRequest("Не корректно введен пароль"))
    }
    const token = generateJwt(user.id, user.email, role)
    console.log(role)
    return res.json({ token })
  }

  async check(req, res, next) {
    const { id, email, role } = req.user
    const token = generateJwt(id, email, role)
    res.json({ token });
  }

  async getAll(req, res) {
    let users
    let {page, limit} = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    users = await User.findAndCountAll({ limit, offset })
    return res.json(users)
  }
  async getOne(req, res) {
    const { id } = req.query;
    const user = await User.findOne({ where: { id } });
    return res.json(user)
  }

  async edit(req, res) {
    const { id, email, password, roleId } = req.body;
    const user = await User.findOne({ where: { id } });
    const hashPassword = await bcrypt.hash(password, 5)
    user.set({
      email: email,
      password: hashPassword,
      roleId: roleId
    })
    await user.save()
  }

  async remove(req, res) {
    const { id } = req.body;
    const user = await User.destroy({ where: { id } });
    if (!user)
      return res.json({ message: "ERROR" })
    else
      return res.json({ message: "OK" })
  }

  async create(req, res) {
    let { email, password, roleId } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Не корректно введен email или пароль'))
    }
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return next(ApiError.badRequest('Этот email уже используется'))
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, password: hashPassword, roleId })
    return res.json({user})
  }
}



module.exports = new UserController();