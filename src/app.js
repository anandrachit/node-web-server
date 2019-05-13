const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const PORT = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(path.join(__dirname,'../public')));

app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather  App',
        name: 'Rachit Anand'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Rachit Anand'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Rachit Anand',
        helpText: 'Some Help Text'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error});
        } 
        forecast(latitude, longitude, (error, {temperature, rainProbability}) => {
            if(error){
                return res.send({error});
            } 
            res.send({
                location, 
                temperature,
                rainProbability
            });
            
            console.log(`Weather forecast for : ${location}`);
            console.log(`It is ${temperature} degrees out there. There is a ${rainProbability}% chance of rain.`)
        })
    }); 
    
    // res.send({
    //     forecast: 'Its 50 degrees', 
    //     location: 'Morgantown',
    //     address: req.query.address
    // });
})

app.get('/help/*', (req, res) => {
    res.render('error_404', {
        title: '404',
        name: 'Rachit Anand',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
     res.render('error_404', {
        title: '404',
        name: 'Rachit Anand',
        errorMessage: 'Page not found'
    })
})

app.listen(PORT, ()=> {
    console.log(`Running on port ${PORT}`);
});