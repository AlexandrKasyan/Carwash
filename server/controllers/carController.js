const { Car } = require('../models/models')

class CarController {
    async create(req, res) {
        const { number, yearRelease, bodyId, carBrandId } = req.body;
        const car = await Car.create({ number, yearRelease, bodyId, carBrandId })
        return res.json(car);
    }
    async getAll(req, res) {
        let cars, page, limit;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        cars = await Car.findAndCountAll({ limit, offset })
        return res.json(cars)
    }

    async getAllCarsByListId(req, res) {
        const {listId}  = req.body;
        let cars = []
        let car
        for (let index = 0; index < listId.length; index++) {
            car = await Car.findOne({ where: { id: listId[index] } })
            cars[index] = car.dataValues
        }
        return res.json(cars)
    }

    async getOne(req, res) {
        const { id } = req.query;
        console.log(id)
        const car = await Car.findOne({ where: { id } });
        return res.json(car)
    }

    async remove(req, res) {
        const { id } = req.body;
        const car = await Car.destroy({ where: { id } });
        if (!car)
            return res.json({ message: "ERROR" })
        else
            return res.json({ message: "OK" })
    }

    async edit(req, res) {
        const { id, number, yearRelease, bodyId, carBrandId } = req.body;
        const car = await Car.findOne({ where: { id } });
        car.set({
            number: number,
            yearRelease: yearRelease,
            bodyId: bodyId,
            carBrandId: carBrandId
        })
        await car.save()
    }
}

module.exports = new CarController();