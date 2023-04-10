const sequelize = require('../db');
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
})

const Role = sequelize.define('role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, unique: true,  allowNull: false  },
})

const Client = sequelize.define('client', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
})

const CarWash = sequelize.define('car_wash', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    number: { type: DataTypes.STRING, allowNull: false },
})

const Discount = sequelize.define('discount', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    discountPercentage: { type: DataTypes.INTEGER, allowNull: false },
    numberVisits: { type: DataTypes.INTEGER, allowNull: false },
})

const ClientCar = sequelize.define('client_car', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dateTime: { type: DataTypes.DATE, allowNull: false },
    generalPrice: { type: DataTypes.DOUBLE, allowNull: false },
})

const WashService = sequelize.define('wash_service', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    cost: { type: DataTypes.DOUBLE, allowNull: false },
})

const Car = sequelize.define('car', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.STRING, allowNull: false, unique: true },
    yearRelease: { type: DataTypes.INTEGER, allowNull: false },
})

const CarBrand = sequelize.define('car_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
})

const CarBody = sequelize.define('body', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
})

const Staff = sequelize.define('staff', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    position: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
})

const Post = sequelize.define('post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    duties: { type: DataTypes.STRING, allowNull: false },
})

const Status = sequelize.define('status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
})

const OrderServiceRelations = sequelize.define('order_service_relations', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

Role.hasMany(User)
User.belongsTo(Role)

Discount.hasMany(Client)
Client.belongsTo(Discount)

CarWash.hasMany(User)
User.belongsTo(CarWash)

User.hasOne(Client)
Client.belongsTo(User)

User.hasMany(Staff)
Staff.belongsTo(User)

Post.hasMany(Staff)
Staff.belongsTo(Post)

Client.hasMany(ClientCar)
ClientCar.belongsTo(Client)

Car.hasMany(ClientCar)
ClientCar.belongsTo(Car)


CarBody.hasMany(Car)
Car.belongsTo(CarBody)

CarBrand.hasMany(Car)
Car.belongsTo(CarBrand)

Status.hasMany(Order)
Order.belongsTo(Status)

Client.hasMany(Order)
Order.belongsTo(Client)

WashService.belongsToMany(Order, { through: OrderServiceRelations })
Order.belongsToMany(WashService, { through: OrderServiceRelations })


module.exports = {
    Car,
    CarBody,
    CarBrand,
    CarWash,
    Client,
    ClientCar,
    Discount,
    Order,
    OrderServiceRelations,
    Post,
    Role,
    Staff,
    Status,
    User,
    WashService
}






