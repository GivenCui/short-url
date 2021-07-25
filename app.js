const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/create', async (req, res) => {
    const {url, slug} = req.body

    res.send({
        url,
        slug,
        date: Date.now()
    })
})

module.exports = app