require('dotenv').config()
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getLocWeather = require('../../utils/getLocWeather')

const app = express()
const port = process.env.PORT

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Hadi El-Yakhni'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Hadi El-Yakhni'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help',
    name: 'Hadi El-Yakhni'
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Hadi El-Yakhni',
    errorMessage: 'Help article not found.'
  })
})

app.get('/weather', (req, res) => {
  const location = req.query.location
  if (!location)
    return res.send({ Error: 'No location is given!' })
  getLocWeather(location, res)
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Hadi El-Yakhni',
    errorMessage: 'Page not found.'
  })
})

app.listen(port, () => {
  console.log('Server is up on port 3000.')
})