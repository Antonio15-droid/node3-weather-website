const path = require('path');
const express = require('express');
const hbs =require('hbs');
const { response } = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')

const app = express();
const port = process.env.PORT || 3000

//define paths express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')//set up handlebars
hbs.registerPartials(partialsPath)
//setup static directory to serve
app.use(express.static(publicDirectoryPath));



app.get('', (req, res) => {
    res.render('index', {
        title:'Weather',
        name: 'Andrew mead'
    })//render views hbs templates
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Andrew mead'
    })
})
app.get('/help',(req, res) =>{
    res.render('help',{
        helpT: 'This is some helpful text',
        title:'Help',
        name: 'Andrew mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if (error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error,forecastData) =>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found'//always last
    })
})
app.listen(port, () => {
  console.log('Server is up on port 3000.' + port);
});
