const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'colombo',
        database: 'smart-brain'
    }
});


const app = express();

app.use(express.json());
app.use(cors())



app.post('/signin',
    signin.handleSignin(db, bcrypt)
)

app.post('/register', (req, res) => {
    register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, db)
})

app.put('/image', (req, res) => {
    image.handleImage(req, res, db)
})
app.post('/imageurl', (req, res) => {
    image.handleApiCall(req, res)
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port 3000 ${process.env.PORT}`)
})