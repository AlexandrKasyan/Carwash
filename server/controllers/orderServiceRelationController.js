const { OrderServiceRelations } = require('../models/models')

class OrderServiceRelationsController {
    async create(req, res) {
        const { washServiceId, orderId } = req.body;
        const orderServiceRelation = await OrderServiceRelations.create({ washServiceId, orderId })
        return res.json(orderServiceRelation);
    }

    async getAll(req, res) {
        let {page, limit} = req.query
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        const orderServiceRelations = await OrderServiceRelations.findAndCountAll({ limit, offset })

        return res.json(orderServiceRelations)
    }
    async getOne(req, res) {
        const { id } = req.query;
        const orderServiceRelation = await OrderServiceRelations.findOne({ where: { id } });
        return res.json(orderServiceRelation)
    }

    async remove(req, res) {
        const { id } = req.body;
        const orderServiceRelation = await OrderServiceRelations.destroy({ where: { id } });
        if (!orderServiceRelation)
            return res.json({ message: "ERROR" })
        else
            return res.json({ message: "OK" })
    }

}

module.exports = new OrderServiceRelationsController();