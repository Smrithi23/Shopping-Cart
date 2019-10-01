const express = require('express')
const userRouter = require('./Routers/user.js')

const path = require('path')  // core npm module

//Define paths for Express config
const viewsPath = path.join(__dirname, './templates/views')

const app = express()
const port = 7000

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use('/uploads',express.static('../uploads'))

require('./db/mongoose.js')

app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)

})