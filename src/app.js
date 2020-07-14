const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'my title',
        name: 'sumit'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'sumit'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help page',
        helpText: 'Help page',
        name: 'sumit'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location,
                forecastData
            });
        })
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        message: 'Help article not found.',
        name: 'sumit'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        message: 'Page not found.',
        name: 'sumit'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});
