require('dotenv').config({ path: '.env.local' })

const cors = require('cors')
const express = require('express')
const { connection } = require('mongoose')

const connectDB = require('./config/connectDB')
const corsOptions = require('./config/corsOptions')

connectDB()

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use('/todos', require('./routes/todos'))

connection.once('open', () => {
    console.log('Database connected!')

    app.listen(4000, () => {
        console.log(`Server started!`)
    })
})
