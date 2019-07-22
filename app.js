const express = require('express')
const app = express()
const session = require('express-session')

app.use(express.json())
app.use(session({
  secret: "Hello",
  resave: false,
  saveUninitialized: true
}))

const users = []

app.post('/api/sessions', (req, res, next) => {
  const {username, password} = req.body
  if (username && password) {
    const user = users.find(user => user.username === username)
  if(user) {
    if (user.password === password) {
      req.session.username = username
      res.send("signed in")
    } else {
      res.status(401).send("Wrong Creditials")
    }
  } else {
    users.push(req.body)
    req.session.username = username
    res.status(204).send(req.session)
  }
  }
})

app.get('/api/sessions', (req, res, next ) => {
  if(!req.session.username) {
    res.status(401).send("Please Sing In")
  } else {
  res.send(req.session)
  }
})

app.delete('/api/sessions', (req, res, next) => {
  if (req.session.username) {
    delete req.session.username
  }
  res.status(204).send('logged out')
})

app.get('/', (req, res, next) => {
  res.send("Please sign in to Continue")
})



module.exports = app
