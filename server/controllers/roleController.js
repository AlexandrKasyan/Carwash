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
        limit = limit || 100;
        let offset = page * limit - limit;
        roles = await Role.findAndCountAll({ limit, offset })

        return res.json(roles)
    }

    async edit(req, res) {
        const { id, role } = req.body;
        const roleEdit = await Role.findOne({ where: { id } });
        roleEdit.set({
          role: role
        })
        await roleEdit.save()
      }

      async remove(req, res) {
        const { id } = req.body;
        const role = await Role.destroy({ where: { id } });
        if (!role)
            return res.json({ message: "ERROR" })
        else
            return res.json({ message: "OK" })
    }

    async getOne(req, res) {
        const { id } = req.query;
        console.log(id)
        const role = await Role.findOne({ where: { id } });
        return res.json(role)
    }

}

module.exports = new RoleController();