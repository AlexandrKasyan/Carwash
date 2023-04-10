const { Status } = require('../models/models')

class StatusController {
    async create(req, res) {
        const { name } = req.body;
        const status = await Status.create({ name })
        return res.json(status);
    }
    
    async getAll(req, res) {
        let statuses, page, limit;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        statuses = await Status.findAndCountAll({ limit, offset })

        return res.json(statuses)
    }
    async getOne(req, res) {
        const { id } = req.query;
        console.log(id)
        const status = await Status.findOne({ where: { id } });
        return res.json(status)
    }

    async remove(req, res) {
        const { id } = req.body;
        const status = await Status.destroy({ where: { id } });
        if (!status)
            return res.json({ message: "ERROR" })
        else
            return res.json({ message: "OK" })
    }

    
    async edit(req, res) {
        const { id, name } = req.body;
        const status = await Status.findOne({ where: { id } });
        status.set({
            name: name
        })
        await status.save()
    }
}

module.exports = new StatusController();