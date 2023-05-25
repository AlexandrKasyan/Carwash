const ApiError = require('../error/apiError');
const { Car } = require('../models/models')

class CarController {
    async create(req, res, next) {
        try {
            const { number, yearRelease, bodyId, carBrandId } = req.body;
            const car = await Car.create({ number, yearRelease, bodyId, carBrandId })
            return res.json(car);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
    async getAll(req, res, next) {
        try {
            let { page, limit } = req.query;
            page = page || 2;
            limit = limit || 9;
            let offset = page * limit - limit;
            const cars = await Car.findAndCountAll({ limit, offset })
            return res.json(cars)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAllCarsByListId(req, res, next) {
        try {
            const { listId } = req.body;
            let cars = []
            let car
            for (let index = 0; index < listId.length; index++) {
                car = await Car.findOne({ where: { id: listId[index] } })
                cars[index] = car.dataValues
            }
            return res.json(cars)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.query;
            console.log(id)
            const car = await Car.findOne({ where: { id } });
            return res.json(car)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.body;
            const car = await Car.destroy({ where: { id } });
            if (!car)
                return res.json({ message: "ERROR" })
            else
                return res.json({ message: "OK" })
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async edit(req, res, next) {
        try {
            const { id, number, yearRelease, bodyId, carBrandId } = req.body;
            const car = await Car.findOne({ where: { id } });
            car.set({
                number: number,
                yearRelease: yearRelease,
                bodyId: bodyId,
                carBrandId: carBrandId
            })
            await car.save()
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new CarController();