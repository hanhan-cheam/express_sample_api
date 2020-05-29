const Respond = require('../helpers/Respond')

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sample',
  password: 123456,
  port: 5432,
})

const AllUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        
        response.status(200).json({ 
            data: results.rows,
            debug : null,
            error: null,
            pagination : null
            
        })
    })
}

const User = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            // throw error
            return Respond.reply(response, result = {     
                "msg" : 'error'
            })
        }
        return Respond.reply(response, result = {
            "id" : results.rows[0].id,
            "username" : results.rows[0].username,
            "firstname" : results.rows[0].firstname,
            "lastname" : results.rows[0].lastname,
            "email" : results.rows[0].email,
            "msg" : 'success'
        })
    })
}

const CreateUser = (request, response) => {
    const { username, firstname, lastname, email } = request.body
  
    pool.query('INSERT INTO users (username, firstname, lastname, email) VALUES ($1, $2, $3, $4)', [username, firstname, lastname, email], (error, results) => {
        if (error) {
            // throw error
            return Respond.reply(response, result = {     
                "msg" : 'error'
            })
        }

        return Respond.reply(response, result ={
            "username" : username,
            "firstname" : firstname,
            "lastname" : lastname,
            "email" : email,
            "msg" : 'success'

        })
    })
}

const UpdateUser = (request, response) => {
    // const id = parseInt(request.params.id)
    var { id, username, firstname, lastname, email } = request.body
    id = parseInt(id)
    pool.query(
    'UPDATE users SET username = $1, firstname = $2, lastname = $3, email = $4 WHERE id = $5',
    [username, firstname, lastname, email, id],
    (error, results) => {
    if (error) {
        throw error
    }
    return Respond.reply(response, result ={
        "id" : id,
        "username" : username,
        "firstname" : firstname,
        "lastname" : lastname,
        "email" : email,
        "msg" : 'success'
    })})
}




const UpdateUserProfile = (profile, id) => {
    // const id = parseInt(request.params.id)
    // const id = parseInt(request.params.id)
    // var { id, username, firstname, lastname, email } = request.body
    // id = parseInt(id)
    pool.query(
    'UPDATE users SET profile = $1 WHERE id = $2',
    [profile, id],
    (error, results) => {
    if (error) {
        throw error
    }
    
    return true
    // return Respond.reply(response, result ={
    //     "id" : "true",
    // })})
})

}



const DeleteUser = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
    throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
})
}















module.exports = {
    AllUsers,
    User,
    CreateUser,
    UpdateUser,
    DeleteUser,
    UpdateUserProfile
}