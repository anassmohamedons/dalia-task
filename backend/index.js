require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

const SERVER_PORT = process.env.PORT || 3000

const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_HOST = process.env.DB_HOST
const DB_DATABASE = process.env.DB_DATABASE
const DB_URL = `mongodb://${DB_USER}:${encodeURIComponent(DB_PASS)}@${DB_HOST}/${DB_DATABASE}`
mongoose.connect(DB_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', (error) => console.error('Database error', error))
db.once('open', () => console.log('Database connected'))

app.use(cors())
app.use(express.json())

const emailsRoutes = require('./routes/emails')
app.use('/emails', emailsRoutes)

app.listen(SERVER_PORT, () => console.log(`Server Started at port ${SERVER_PORT}`))