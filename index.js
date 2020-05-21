const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 4500
const db = require('./controller/User')
var cors = require('cors')
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/users', db.AllUsers)
app.get('/user/:id', db.User)
app.post('/createuser', db.CreateUser)
app.post('/deleteuser', db.DeleteUser)
app.post('/updateuser', db.UpdateUser)



app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

