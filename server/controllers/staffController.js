const { Staff } = require('../models/models')

class StaffController {
    async create(req, res) {
        const { name, position, phoneNumber, userId, postId } = req.body;
        const staff = await Staff.create({ name, position, phoneNumber, userId, postId })
        return res.json(staff);
    }

    async getAll(req, res) {
        let { page, limit } = req.query
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        const staffs = await Staff.findAndCountAll({ limit, offset })

        return res.json(staffs)
    }
    async getOne(req, res) {
        const { id } = req.query;
        const staff = await Staff.findOne({ where: { id } });
        return res.json(staff)
    }
    async getEmployeeByUserId(req, res) {
        const { id } = req.query;
        const staff = await Staff.findOne({ where: { userId: id } });
        return res.json(staff)
    }

    async remove(req, res) {
        const { id } = req.body;
        const staff = await Staff.destroy({ where: { id } });
        if (!staff)
            return res.json({ message: "ERROR" })
        else
            return res.json({ message: "OK" })
    }

    async edit(req, res) {
        const { id, name, phoneNumber, position, userId, postId } = req.body;
        const staff = await Staff.findOne({ where: { id } });
        staff.set({
            name: name,
            phoneNumber: phoneNumber,
            position: position,
            userId: userId,
            postId: postId
        })
        await staff.save()
    }
}

module.exports = new StaffController();