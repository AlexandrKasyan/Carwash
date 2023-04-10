const { Post } = require('../models/models')

class PostController {
    async create(req, res) {
        const { name, duties } = req.body;
        const post = await Post.create({ name, duties })
        return res.json(post);
    }

    async getAll(req, res) {
        let { page, limit } = req.query
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        const posts = await Post.findAndCountAll({ limit, offset })

        return res.json(posts)
    }
    async getOne(req, res) {
        const { id } = req.query;
        const post = await Post.findOne({ where: { id } });
        return res.json(post)
    }

    async remove(req, res) {
        const { id } = req.body;
        const post = await Post.destroy({ where: { id } });
        if (!post)
            return res.json({ message: "ERROR" })
        else
            return res.json({ message: "OK" })
    }

    async edit(req, res) {
        const { id, name, duties } = req.body;
        const post = await Post.findOne({ where: { id } });
        post.set({
            name: name,
            duties: duties
        })
        await post.save()
    }
}

module.exports = new PostController();