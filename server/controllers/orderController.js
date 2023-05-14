const ApiError = require('../error/apiError');
const { Order, Status } = require('../models/models')
const {Sequelize} = require('sequelize');


class OrderController {
    async create(req, res, next) {
        try {
            const { dateTime, generalPrice, statusId, clientId, carId } = req.body;
            const order = await Order.create({ dateTime, generalPrice, statusId, clientId, carId })
            return res.json(order);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        let { page, limit } = req.query
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        const orders = await Order.findAndCountAll({ limit, offset })

        return res.json(orders)
    }

    async getClientOrders(req, res, next) {
        try {
            const { id } = req.query;
            const order = await Order.findAll({ where: { clientId: id } });
            return res.json(order)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getOne(req, res) {
        const { id } = req.query;
        const order = await Order.findOne({ where: { id } });
        return res.json(order)
    }

    async getByDate(req, res) {
        try {
            const { dateTime } = req.query;
            const order = await Order.findAndCountAll({ where: Sequelize.where(Sequelize.fn('date', Sequelize.col('dateTime')), dateTime)});
            return res.json(order)
        } catch (error) {
            return res.json(error.message)
        }
    }

    async remove(req, res) {
        const { id } = req.body;
        const order = await Order.destroy({ where: { id } });
        if (!order)
            return res.json({ message: "ERROR" })
        else
            return res.json({ message: "OK" })
    }

    async edit(req, res) {
        const { id, dateTime, generalPrice, statusId, clientId, carId } = req.body;
        const order = await Order.findOne({ where: { id } });
        order.set({
            dateTime: dateTime,
            generalPrice: generalPrice,
            statusId: statusId,
            dateTime: dateTime,
            clientId: clientId,
            carId: carId
        })
        await order.save()
    }

    async changeStatus(req, res) {
        try {
            const { id, statusName } = req.body;
            const order = await Order.findOne({ where: { id } });
            const status = await Status.findOne({ where: { name: statusName } });
            order.set({
                statusId: status.id,
            })
            await order.save()
            return res.json(order)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }
}

module.exports = new OrderController();