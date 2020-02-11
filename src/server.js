const express = require('express')
const app = express()
const auth = require('./routes/authRoutes')
const categoria = require('./routes/categoriasRoutes')
const authMiddlewares = require('./middlewares/auth')

app.use(express.json())

app.use('/', auth)

// Todas as rotas que estiverem abaixo, vão passa pelo Middleware
app.use(authMiddlewares)

app.use('/categorias', categoria)

module.exports = app