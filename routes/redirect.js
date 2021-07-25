const storage = require('../lib/storage')

/** @type {import('express').RequestHandler*/
module.exports = async (req, res) => {
    const { slug } = req.params
    try {
        const url = await storage.getUrlBySlug(slug)
        console.log('url', url)
        res.redirect(url)
    } catch (error) {
        res.status(500).send({ message: e.message })
    }
}