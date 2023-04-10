const { WashService } = require('../models/models')

class WashServiceController {
    async create(req, res) {
        const { name, description, cost } = req.body;
        const washService = await WashService.create({ name, description, cost })
        return res.json(washService);
    }

    async getAll(req, res) {
        let {page, limit} = req.query
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        const washServices = await WashService.findAndCountAll({ limit, offset })

        return res.json(washServices)
    }
    async getOne(req, res) {
        const { id } = req.query;
        const washService = await WashService.findOne({ where: { id } });
        return res.json(washService)
    }

    async remove(req, res) {
        const { id } = req.body;
        const washService = await WashService.destroy({ where: { id } });
        if (!washService)
            return res.json({ message: "ERROR" })
        else
            return res.json({ message: "OK" })
    }

    async edit(req, res) {
        const { id, name, description, cost} = req.body;
        const washService = await WashService.findOne({ where: { id } });
        washService.set({
            name: name,
            description: description,
            cost: cost,

        })
        await washService.save()
    }

}

module.exports = new WashServiceController();