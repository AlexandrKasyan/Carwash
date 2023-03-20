const { Client } = require('../models/models')

class ClientController {
    async create(req, res) {
        const { name, phoneNumber, userId } = req.body;
        const client = await Client.create({ name, phoneNumber, userId })
        return res.json(client);
    }
    async getAll(req, res) {
        let clients, page, limit;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        clients = await Client.findAndCountAll({ limit, offset })

        return res.json(clients)
    }
    async getOne(req, res) {
        const { id } = req.query;
        console.log(id)
        const client = await Client.findOne({ where: { id } });
        return res.json(client)
    }

    async remove(req, res) {
        const { id } = req.body;
        const client = await Client.destroy({ where: { id } });
        if (!client)
            return res.json({ message: "ERROR" })
        else
            return res.json({ message: "OK" })
    }

    async removeFromUser(req, res) {
        const { id } = req.body;
        const client = await Client.destroy({ where: { userId: id } });
        if (!client)
            return res.json({ message: "ERROR" })
        else
            return res.json({ message: "OK" })
    }
}

module.exports = new ClientController();