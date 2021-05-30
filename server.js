'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const axios = require('axios');

const handleWeather = require('./modules/weather.js')
const getMovie = require('./modules/movie.js')
// const weatherData = require('./data/weather.json');
const server = express();
server.use(cors());

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Listening on PORT `);
})

server.get('/', (req, res) => {
    res.send('HELLO from Home Route')
});

// server.get('/test', (request, response) => {

//     response.send('string');
// })




// http://localhost:3001/getCity?city_name=Amman
// server.get('/weather', (req, res) => {
//     console.log(req.query)

//     let cityName= req.query.city_name
//     // let lonData = req.query.lon
//     // let latData = req.query.lat
//     let cityData;

//     let Items = weatherData.find(item => {
//         if (item.city_name.toLowerCase() == cityName.toLowerCase() ){
//             return item
//         }
//     })

//    try{
//        let forecastArr= Items.data.map(item =>{
//            return new Forecast(item)
//        })
//        res.send(forecastArr)
//    }
//    catch{
//        res.send('Error: The weather info for the city you searched for is not available')
//    }


// })



server.get('/weather', getWeather);
server.get('/movies', getMovie);

async function getWeather(req, res) {

    let city = req.query.city
    // let key = process.env.WEATHER_KEY;
    // let key = `500b0343d93143769c99731a1b47346f`;

    // test URL: https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=500b0343d93143769c99731a1b47346f
    handleWeather(city)
        .then(weatherData => res.send(weatherData))
        .catch((error) => {
            console.error(error);
            res.status(500).send('Sorry. Something went wrong!',error)
        });


}




server.get('*', (req, res) => {
    res.send('Not Found')
});