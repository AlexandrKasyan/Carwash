//Описание модели таблиц базы данных
const sequelize = require('../db');
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
})//Описание таблицы пользователя

const Role = sequelize.define('role', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, unique: true,  allowNull: false  },
})//Описание таблицы роли

const Client = sequelize.define('client', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
})//Описание таблицы клиента

const CarWash = sequelize.define('car_wash', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },//Название автомойки
    address: { type: DataTypes.STRING, allowNull: false },
    number: { type: DataTypes.STRING, allowNull: false },
})//Описание таблицы с автомойками

const Discount = sequelize.define('discount', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },//название скидки
    discountPercentage: { type: DataTypes.INTEGER, allowNull: false },
    numberVisits: { type: DataTypes.INTEGER, allowNull: false },
})//Описание таблицы скидок

const ClientCar = sequelize.define('client_car', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})//Описание таблицы автомобилей клиента

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dateTime: { type: DataTypes.DATE, allowNull: false },
    generalPrice: { type: DataTypes.DOUBLE, allowNull: false },
})//Описание таблицы заказов

const WashService = sequelize.define('wash_service', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },//название услуги
    description: { type: DataTypes.TEXT },
    cost: { type: DataTypes.DOUBLE, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false }
    
})

const WashServiceType = sequelize.define('wash_service_type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true},//тип услуги

})//Описание таблицы типов услуг 

const Car = sequelize.define('car', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    number: { type: DataTypes.STRING, allowNull: false, unique: true },//номер автомобиля
    yearRelease: { type: DataTypes.INTEGER, allowNull: false },
})//Описание таблицы автомобиля

const CarBrand = sequelize.define('car_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }//название бренда
})//Описание таблицы брендов автомобиля 

const CarBody = sequelize.define('body', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }//название кузова
})//Описание таблицы кузовов автомобиля 

const Staff = sequelize.define('staff', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },//ФИО сотрудника
    position: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
})//Описание таблицы штата сотрудников

const Post = sequelize.define('post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },//название должности
    duties: { type: DataTypes.STRING, allowNull: false },
})//Описание таблицы должности сотрудника

const Status = sequelize.define('status', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },// название статуса выполнения 
})//Описание таблицы статуса выполнения заказа

const OrderServiceRelations = sequelize.define('order_service_relations', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})//Описание таблицы отношения заказа к услуге

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

Car.hasMany(Order)
Order.belongsTo(Car)

WashServiceType.hasMany(WashService)
WashService.belongsTo(WashServiceType)

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
    WashService,
    WashServiceType
}






