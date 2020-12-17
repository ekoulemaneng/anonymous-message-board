require('dotenv').config();

const express = require('express')
const app = express()

const helmet = require('helmet')
app.use(helmet.frameguard())
app.use(helmet.dnsPrefetchControl())
app.use(helmet.referrerPolicy())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: false}))

app.use(express.static('public'))
app.use(express.static('node_modules'))

app.set('views', './views')
app.set('view engine', 'pug')

const mongoose = require('mongoose')
mongoose.connect(process.env.database, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
mongoose.connection.on('error', console.error.bind(console, 'Erreur de connection:'))
mongoose.connection.once('open', () => { console.log('Connecté !') })

const routeIndex = require('./routes/index')
const routeBoards = require('./routes/boards')
const routeThreads = require('./routes/threads')
const routeReplies = require('./routes/replies')

app.use('/', routeIndex)
app.use('/api', routeBoards)
app.use('/api/threads', routeThreads)
app.use('/api/replies', routeReplies)



app.listen(3000, () => { console.log('Rendez-vous à l\'adresse http://localhost:3000')})

