const { Role } = require('../models/models')

class RoleController {
    async create(req, res) {
        const { role } = req.body;
        console.log(role)
        const namerole = await Role.create({ role })
        return res.json(namerole);
    }
    async getAll(req, res) {
        let roles, page, limit;
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        roles = await Role.findAndCountAll({ limit, offset })

        return res.json(roles)
    }
    async getOne(req, res) {
        const { id } = req.query;
        console.log(id)
        const role = await Role.findOne({ where: { id } });
        return res.json(role)
    }

}

module.exports = new RoleController();