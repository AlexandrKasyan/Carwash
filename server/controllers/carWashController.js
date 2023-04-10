const { CarWash } = require('../models/models')

class CarModelController {
    async create(req, res) {
        const { name, address, number } = req.body;
        const carWash = await CarWash.create({ name, address, number })
        return res.json(carWash);
    }
    
    async getAll(req, res) {
        let carWashes, page, limit;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        carWashes = await CarWash.findAndCountAll({ limit, offset })

        return res.json(carWashes)
    }
    async getOne(req, res) {
        const { id } = req.query;
        console.log(id)
        const carWash = await CarWash.findOne({ where: { id } });
        return res.json(carWash)
    }

    async edit(req, res) {
        const { id, name, number, address } = req.body;
        const carWash = await CarWash.findOne({ where: { id } });
        carWash.set({
          name: name,
          number: number,
          address: address,
        })
        await carWash.save()
      }

    async remove(req, res) {
        const { id } = req.body;
        const carWash = await CarWash.destroy({ where: { id } });
        if (!carWash)
            return res.json({ message: "ERROR" })
        else
            return res.json({ message: "OK" })
    }

}

module.exports = new CarModelController();