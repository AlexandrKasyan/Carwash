const { ClientCar } = require('../models/models')

class ClientController {
    async create(req, res) {
        const { clientId, carId } = req.body;
        const clientCar = await ClientCar.create({ clientId, carId })
        return res.json(clientCar);
    }

    async getAll(req, res) {
        let { clientId, page, limit } = req.query;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        let cars;
        if (!clientId ) {
            cars = await ClientCar.findAndCountAll({ limit, offset })
        }
        if (clientId) {
            cars = await ClientCar.findAndCountAll({ where: { clientId }, limit, offset })
        }

        return res.json(cars)
    }

    async getOne(req, res) {
        const { id } = req.query;
        console.log(id)
        const clientCar = await ClientCar.findOne({ where: { id } });
        return res.json(clientCar)
    }

    async remove(req, res) {
        const { id } = req.body;
        const clientCar = await ClientCar.destroy({ where: { id } });
        if (!clientCar)
          return res.json({ message: "ERROR" })
        else
          return res.json({ message: "OK" })
      }

      async edit(req, res) {
        const { id, clientId, carId} = req.body;
        const clientCar = await ClientCar.findOne({ where: { id } });
        clientCar.set({
            clientId: clientId,
            carId: carId
        })
        await clientCar.save()
    }
}

module.exports = new ClientController();