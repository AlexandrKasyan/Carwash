const { Client } = require('../models/models')

class ClientController {
    async create(req, res) {
        const { name, phoneNumber, userId, discountId } = req.body;
        const client = await Client.create({ name, phoneNumber, userId, discountId })
        return res.json(client);
    }
    async getAll(req, res) {
        let { page, limit } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        const clients = await Client.findAll()

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

    async edit(req, res) {
        const { id, name, phoneNumber, userId, discountId } = req.body;
        const client = await Client.findOne({ where: { id } });
        client.set({
            name: name,
            phoneNumber: phoneNumber,
            userId: userId,
            discountId: discountId
        })
        await client.save()
    }

    async changeName(req, res) {
        const { id, name } = req.body;
        const client = await Client.findOne({ where: { id } });
        client.set({
            ...client,
            name: name
        })
        await client.save()
    }

    async changePhone(req, res) {
        const { id, phoneNumber } = req.body;
        const client = await Client.findOne({ where: { id } });
        client.set({
            ...client,
            phoneNumber: phoneNumber
        })
        await client.save()
    }

    async getClientInfoByUserId(req, res) {
        const { id } = req.query;
        const client = await Client.findOne({ where: { userId: id } });
        return res.json(client)
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