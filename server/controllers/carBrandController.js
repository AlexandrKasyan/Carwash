const { CarBrand } = require('../models/models')

class CarBrandController {
    async create(req, res) {
        const { name } = req.body;
        const carBrand = await CarBrand.create({ name })
        return res.json(carBrand);
    }
    
    async getAll(req, res) {
        const carBrands = await CarBrand.findAndCountAll( )

        return res.json(carBrands)
    }
    async getOne(req, res) {
        const { id } = req.query;
        console.log(id)

        const carBrand = await CarBrand.findOne({ where: { id } });
        return res.json(carBrand)
    }

    async remove(req, res) {
        const { id } = req.body;
        const carBrand = await CarBrand.destroy({ where: { id } });
        if (!carBrand)
            return res.json({ message: "ERROR" })
        else
            return res.json({ message: "OK" })
    }

    async edit(req, res) {
        const { id, name } = req.body;
        const carBrand = await CarBrand.findOne({ where: { id } });
        carBrand.set({
            name: name
        })
        await carBrand.save()
    }

}

module.exports = new CarBrandController();