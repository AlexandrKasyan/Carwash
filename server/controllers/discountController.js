const { Discount } = require('../models/models')

class DiscountController {
    async create(req, res) {
        try {
            const { name, discountPercentage, numberVisits } = req.body;
            const discount = await Discount.create({ name, discountPercentage, numberVisits })
            return res.json(discount);
        } catch (error) {
            return res.json(error.message)
        }

    }

    async getAll(req, res) {
        try {
            let { page, limit } = req.query
            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;
            const discounts = await Discount.findAndCountAll({ limit, offset })

            return res.json(discounts)
        } catch (error) {
            return res.json(error.message)
        }

    }
    async getDiscount(req, res) {
        try {
            const { id } = req.query;
            const discount = await Discount.findOne({ where: { id } });
            return res.json(discount)
        } catch (error) {
            return res.json(error.message)
        }

    }

    async remove(req, res) {

        try {
            const { id } = req.body;
            const discount = await Discount.destroy({ where: { id } });

        } catch (error) {
            return res.json(error.message)
        }

    }

    async edit(req, res) {
        try {
            const { id, name, discountPercentage, numberVisits } = req.body;
            const discount = await Discount.findOne({ where: { id } });
            discount.set({
                name: name,
                discountPercentage: discountPercentage,
                numberVisits: numberVisits,

            })
            await discount.save()
            return res.json(discount)
        } catch (error) {
            return res.json(error.message)
        }

    }

}

module.exports = new DiscountController();