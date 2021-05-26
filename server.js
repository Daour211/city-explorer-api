'use strict';

const express = require('express');
const weatherData = require('./data/weather.json');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');

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
    // let lat = req.query.lat;
    // let lon = req.query.lon;
    let city = req.query.city
    

    let key = process.env.WEATHER_KEY;
    // let key = `500b0343d93143769c99731a1b47346f`;

    // test URL: https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=500b0343d93143769c99731a1b47346f
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`


    try {
        const result = await axios.get(url);
        // console.log('in axios')
        console.log(result);
        const weatherArray = result.data.data.map(Item=>{
            return new Forecast(Item)
        })
        res.send(weatherArray);

    } catch (error) {
        // console.log(error)
        res.status(500).send(`error in getting the weather data ==> ${error}`);

    }


}


async function getMovie(req, res) {

    let movie = req.query.query

    let key1 = process.env.MOVIE_API_KEY;

    // test URL: https://api.themoviedb.org/3/search/movie?api_key=436281052c009396f1046ba27be009e1&query=amman   
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key1}&query=${movie}`

    

    try {
        const movieResult = await axios.get(url);
        const movieArray = movieResult.data.results.map(Item=>{
            return new Movie(Item)
        })
        res.send(movieArray);

    } catch (error) {
        console.log(error)
        res.status(500).send(`error in getting the movie data ==> ${error}`);
    }


}

class Forecast {

    constructor(arrData) {

        this.date = arrData.valid_date
        this.descrption = arrData.weather.description;
        // this.date = date;
        // this.description= description;
    }


    
}
class Movie {

    constructor(item) {

        this.title = item.original_title
        this.overview= item.overview
        this.average_votes = item.vote_average
        this.total_votes =item.vote_count
        this.image_url = item.poster_path
        this.popularity = item.popularity
        this.released_on =item.release_date
        
        
    }


}


server.get('*', (req, res) => {
    res.send('Not Found')
});