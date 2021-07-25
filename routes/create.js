const storage = require('../lib/storage')

/** @type {import('express').RequestHandler*/
module.exports = async (req, res) => {
    const {url, slug} = req.body

    // 必填项url校验
    if(!url) return res.status(400).send({message: 'Missing required parameter: url.'})
    
    // url格式校验
    if(!/^https?:\/\/.{3,}/.test(url)) {
        return res.status(400).send({message: 'Illegal format: url.'})
    }

    // slug合法长度校验
    if(slug && (slug.length < 2 || slug.length > 10)) {
        return res.status(400).send({message: 'Illegal slug (>=2 && <=10).'})
    }

    try {
        const origin = `${req.protocol}://${req.get('host')}/`

        // 自定义 slug (入参: url, slug)
        if(slug) {
            const existUrl = await storage.getUrlBySlug(slug)

            // 匹配, 直接返回
            if(existUrl === url) {
                return res.send({slug, link: origin + slug})
            }

            // slug已被占用
            if(existUrl) {
                return res.status(400).send({message: 'Slug already exists.'})
            }
        }

        // 自动生成 slug (入参: url)
        const existSlug = await storage.getSlugByUrl(url)
        if(existSlug && !slug) {
            return res.send({ slug: existSlug, link: origin + existSlug })
        }

        // 如果不存在, 创建
        const newSlug = await storage.addLink(url, slug)

        res.send({slug: newSlug, link: origin + newSlug})
    } catch(e) {
        res.status(500).send({ message: e.message })
    }
}