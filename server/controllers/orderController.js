const { Order } = require('../models/models')

class OrderController {
    async create(req, res) {
        const { dateTime, generalPrice, statusId, clientId } = req.body;
        const order = await Order.create({ dateTime, generalPrice, statusId, clientId })
        return res.json(order);
    }

    async getAll(req, res) {
        let {page, limit} = req.query
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        const orders = await Order.findAndCountAll({ limit, offset })

        return res.json(orders)
    }
    async getOne(req, res) {
        const { id } = req.query;
        const order = await Order.findOne({ where: { id } });
        return res.json(order)
    }

    async remove(req, res) {
        const { id } = req.body;
        const order = await Order.destroy({ where: { id } });
        if (!order)
            return res.json({ message: "ERROR" })
        else
            return res.json({ message: "OK" })
    }

}

module.exports = new OrderController();