const { CarBody } = require('../models/models')

class CarBrandController {
    async create(req, res) {
        const { name } = req.body;
        const carBody = await CarBody.create({ name })
        return res.json(carBody);
    }
    
    async getAll(req, res) {
        const carBodys = await CarBody.findAndCountAll()
        return res.json(carBodys)
    }
    async getOne(req, res) {
        const { id } = req.query;
        console.log(id)
        const carBody = await CarBody.findOne({ where: { id } });
        return res.json(carBody)
    }

    async remove(req, res) {
        const { id } = req.body;
        const carBody = await CarBody.destroy({ where: { id } });
        if (!carBody)
            return res.json({ message: "ERROR" })
        else
            return res.json({ message: "OK" })
    }

    async edit(req, res) {
        const { id, name } = req.body;
        const body = await CarBody.findOne({ where: { id } });
        body.set({
            name: name,
        })
        await body.save()
    }

}

module.exports = new CarBrandController();