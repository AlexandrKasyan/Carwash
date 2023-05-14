const ApiError = require('../error/apiError');
const { ClientCar } = require('../models/models')

class ClientController {
    async create(req, res, next) {
        try {
            const { clientId, carId } = req.body;
            const clientCar = await ClientCar.create({ clientId, carId })
            return res.json(clientCar);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getAll(req, res, next) {
        try {
            let { clientId, page, limit } = req.query;
            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;
            let cars;
            if (!clientId) {
                cars = await ClientCar.findAndCountAll({ limit, offset })
            }
            if (clientId) {
                cars = await ClientCar.findAndCountAll({ where: { clientId }, limit, offset })
            }

            return res.json(cars)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getOne(req, res, next) {
        try {
            const { id } = req.query;
            const clientCar = await ClientCar.findOne({ where: { id } });
            return res.json(clientCar)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async getClientCars(req, res, next) {
        try {
            const { clientId } = req.query;
            const clientCars = await ClientCar.findAll({ where: { clientId: clientId } });
            return res.json(clientCars)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async remove(req, res, next) {
        try {
            const { id } = req.body;
            const clientCar = await ClientCar.destroy({ where: { id } });
            if (!clientCar)
                return res.json({ message: "ERROR" })
            else
                return res.json({ message: "OK" })
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }

    async removeByCarId(req, res, next) {
        try {
            const { id } = req.body;
            const clientCar = await ClientCar.destroy({ where: { carId: id } });
            console.log(clientCar)
            if (!clientCar)
                return res.json({ message: "ERROR" })
            else
                return res.json({ message: "OK" })
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }


    async edit(req, res, next) {
        try {
            const { id, clientId, carId } = req.body;
            const clientCar = await ClientCar.findOne({ where: { id } });
            clientCar.set({
                clientId: clientId,
                carId: carId
            })
            await clientCar.save()
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }

    }
}

module.exports = new ClientController();