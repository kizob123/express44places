const bodyParser = require('body-parser')
const express = require('express')

const app = express()
const routes = express.Router()
const login = require('./src/db/login_db/connect_to_db')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: false
}))
let num = 0
app.use(bodyParser.json())

routes.post('/login', (req, res) => {

    login.login(req.body.email, req.body.password, res)

})
routes.post('/register', (req, res) => {
    console.log(req.url)
    login.register(req.body.fname, req.body.lname, req.body.location,
        req.body.email, req.body.password, req.body.business, req.body.phone, req.body.routes, res)
})
app.use('/login', routes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server started at ${PORT}`))
    .on('connection', function () {
        console.log("conn", num++);
    })
