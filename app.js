const express = require('express')
const { nanoid } =  require('nanoid')
const { init } = require('@cloudbase/node-sdk');

// 在 CloudBase 云函数内使用服务端 SDK 时, 不需要密钥, 从环境变量中读取即可
const {SECRET_ID, SECRET_KEY} = process.env 

const tcb = init({
    env: 'test-6g86kl1g67b9f852', // 环境ID
    secretId: SECRET_ID,
    secretKey: SECRET_KEY
});

// 1. 获取数据库引用
const db = tcb.database()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 新建 api
app.post('/create', async (req, res) => {
    const {url, slug = nanoid(4)} = req.body
    
    // 2. 类似 MongoDB
    await db.collection('links').add({ slug, url })

    res.send({ link: `http://localhost:8081/${slug}` })
})

// 短链跳转
app.get('/:slug', async(req, res) => {
    const { slug } = req.params
    const { data } = await db.collection('links').where({ slug }).get()
    const [link] = data
    console.log('link -->', link)
    res.redirect(link.url)
})
module.exports = app