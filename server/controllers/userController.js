//Контроллер для работы с таблицей пользователя
const ApiError = require('../error/apiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Role } = require('../models/models')

const generateJwt = (id, email, role, carWashId, createdAt) => {
  return jwt.sign(
    { id, email, role, carWashId, createdAt },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  )
}//Функция генерации JWT токена для авторизации пользователя

class UserController {
  async registration(req, res) {
    let { email, password, roleId, carWashId } = req.body; //получение данных из тела запроса
    roleId = roleId || 2;
    carWashId = carWashId || 1;
    if (!email || !password) {
      return ApiError.badRequest('Не корректно введен email или пароль')
    }
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return ApiError.badRequest('Этот email уже используется')
    }

    const hashPassword = await bcrypt.hash(password, 5)//хеширование пароля
    const user = await User.create({ email, password: hashPassword, roleId, carWashId })//Создание ползователя
    const { role } = await Role.findOne({ where: { id: roleId } });
    const token = generateJwt(user.id, user.email, role, user.carWashId, user.createdAt)
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
      return next(ApiError.badRequest("Неверно указан пароль"))
    }
    const token = generateJwt(user.id, user.email, role, user.carWashId, user.createdAt)
    return res.json({ token })
  }

  async check(req, res, next) {
    const { id, email, role, carWashId, createdAt } = req.user
    const token = generateJwt(id, email, role, carWashId, createdAt)
    res.json({ token });
  }

  async getUsers(req, res) {
    let users
    let {page, limit} = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    users = await User.findAndCountAll({ limit, offset })
    return res.json(users)
  }//получение списка всех пользователей

    async getAll(req, res) {

    const users = await User.findAll()
    return res.json(users)
  }
  async getOne(req, res) {
    const { id } = req.query;
    const user = await User.findOne({ where: { id } });
    return res.json(user)
  }//получение оного пользователя

  async account(req, res) {
    const token  =  req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ where: { id: decode.id } });
    return res.json(user)
  }

  async edit(req, res) {
    const { id, email, password, roleId, carWashId } = req.body;
    const user = await User.findOne({ where: { id } });
    const hashPassword = await bcrypt.hash(password, 5)
    user.set({
      email: email,
      password: hashPassword,
      roleId: roleId,
      carWashId: carWashId
    })
    await user.save()
    return res.json(user)
  }// изменение данных администратором

  async editByUserEmail(req, res) {
    const { id, email} = req.body;
    const user = await User.findOne({ where: { id } });
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return ApiError.badRequest('Этот email уже используется')
    }
    user.set({
      ...user,
      email: email
    })
    await user.save()
    return res.json(user)
  }// изменение данных пользователем

  async editByUserCarWash(req, res) {
    const { id, carWashId} = req.body;
    const user = await User.findOne({ where: { id } });
    user.set({
      ...user,
      carWashId: carWashId
    })
    await user.save()
    return res.json(user)
  }// изменение данных пользователем

    async editByUserPassword(req, res) {
    const { id, newPassword, lastPassword} = req.body;
    const user = await User.findOne({ where: { id } });
    let comparePassword = bcrypt.compareSync(lastPassword, user.password)
    if (!comparePassword) {
      return ApiError.badRequest("Не корректно введен пароль")
    }
    const hashPassword = await bcrypt.hash(newPassword, 5)//хеширование пароля

    user.set({
      ...user,
      password: hashPassword
    })
    await user.save()
    return res.json("Пароль успешно изменён")
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
    let { email, password, roleId, carWashId } = req.body;

    if (!email || !password) {
      return ApiError.badRequest('Не корректно введен email или пароль')
    }
    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      return ApiError.badRequest('Этот email уже используется')
    }
    const hashPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, password: hashPassword, roleId, carWashId })
    return res.json({user})
  }//создание пользователя администратором

  
}



module.exports = new UserController();