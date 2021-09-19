require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')
const router = require('./router/index')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(express.json())
app.use(fileUpload({}))
app.use('/api', router);

app.use(errorHandler)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()