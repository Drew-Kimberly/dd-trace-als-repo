require('dd-trace').init()

const { AsyncLocalStorage } = require('async_hooks')
const express = require('express')

const als = new AsyncLocalStorage()
const app = express()

app.use((req, _, next) => {
    als.run({ path: req.path }, next)
})

app.get('*', (_, res) => {
    const store = als.getStore()
    if (!store) {
        throw new Error('ALS store is undefined')
    }

    return res.json(store)
})

module.exports = { app }
