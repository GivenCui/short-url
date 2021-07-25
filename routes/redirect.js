const storage = require('../lib/storage')

/** @type {import('express').RequestHandler*/
module.exports = async (req, res) => {
    const { slug } = req.params

    if (typeof slug !== 'string' || slug === '') {
        return res.status(400).send('Bad Request')
    }

    try {
        // get target url by slug
        const url = await storage.getUrlBySlug(slug)

        // target url not found
        if (url == null) return res.status(404).send('Not Found')

        // add access log
        await storage.addLog(slug, req.headers['user-agent'], req.headers['x-real-ip'])

        res.redirect(url)
    } catch (e) {
        return res.status(500).send(e.message)
    }
}