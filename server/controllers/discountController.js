const { Discount } = require('../models/models')

class DiscountController {
    async create(req, res) {
        const { name, discountPercentage, numberVisits } = req.body;
        const discount = await Discount.create({ name, discountPercentage, numberVisits })
        return res.json(discount);
    }

    async getAll(req, res) {
        let {page, limit} = req.query
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        const discounts = await Discount.findAndCountAll({ limit, offset })

        return res.json(discounts)
    }
    async getOne(req, res) {
        const { id } = req.query;
        const discount = await Discount.findOne({ where: { id } });
        return res.json(discount)
    }

    async remove(req, res) {
        const { id } = req.body;
        const discount = await Discount.destroy({ where: { id } });
        if (!discount)
            return res.json({ message: "ERROR" })
        else
            return res.json({ message: "OK" })
    }

}

module.exports = new DiscountController();