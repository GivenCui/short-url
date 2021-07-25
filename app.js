const path = require('path')
const express = require('express')

const create = require('./routes/create.js') 
const redirect = require('./routes/redirect.js')

const app = express()

app.set('x-powered-by', false) // 担心暴露服务器信息人为去掉, 节省带宽

app.use(express.static(path.join(__dirname, './public'))) // 处理静态文件请求
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/create', create)
app.get('/:slug', redirect)

module.exports = app