const ApiError = require('../error/apiError');
const { OrderServiceRelations } = require('../models/models')

class OrderServiceRelationsController {
    async create(req, res, next) {
        try {
            const { washServiceId, orderId } = req.body;
            const orderServiceRelation = await OrderServiceRelations.create({ washServiceId, orderId })
            return res.json(orderServiceRelation);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getAll(req, res) {
        let { page, limit } = req.query
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        const orderServiceRelations = await OrderServiceRelations.findAndCountAll({ limit, offset })

        return res.json(orderServiceRelations)
    }

    async getAllOrderWashServices(req, res) {
        try {
            const { orderId } = req.query
            const orderServiceRelations = await OrderServiceRelations.findAll({ where: { orderId } })
            return res.json(orderServiceRelations)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
        
    }

    async getOne(req, res) {
        try {
            const { id } = req.query;
            const orderServiceRelation = await OrderServiceRelations.findOne({ where: { id } });
            return res.json(orderServiceRelation)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async remove(req, res) {
        try {
            const { id } = req.body;
            const orderServiceRelation = await OrderServiceRelations.destroy({ where: { id } });
            if (!orderServiceRelation)
                return res.json({ message: "ERROR" })
            else
                return res.json({ message: "OK" })
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async edit(req, res) {
        try {
            const { id, washServiceId, orderId } = req.body;
            const orderServiceRelation = await OrderServiceRelations.findOne({ where: { id } });
            orderServiceRelation.set({
                washServiceId: washServiceId,
                orderId: orderId
            })
            await orderServiceRelation.save()
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

}

module.exports = new OrderServiceRelationsController();