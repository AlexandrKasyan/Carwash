const { WashService } = require('../models/models')
const { v4 } = require('uuid')
const { resolve } = require('path')
const ApiError = require('../error/apiError')

class WashServiceController {
    async create(req, res, next) {
        try {
            const { name, description, cost } = req.body;
            const { img } = req.files;
            let fileName = v4() + ".jpg"
            img.mv(resolve(__dirname, '..', 'static', fileName))
            const washService = await WashService.create({ name, description, cost, img: fileName })
            return res.json(washService);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res) {
        let { page, limit } = req.query
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

    async edit(req, res, next) {
        try {
            const { id, name, description, cost } = req.body;
            const { img } = req.files;
            let fileName = v4() + ".jpg"
            img.mv(resolve(__dirname, '..', 'static', fileName))

            const washService = await WashService.findOne({ where: { id } })
            washService.set({
                id: id,
                name: name,
                description: description,
                cost: cost,
                img: fileName
            })
            await washService.save()
            return res.json(washService);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new WashServiceController();