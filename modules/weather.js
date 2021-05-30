'use strict';

const { default: axios } = require("axios");

module.exports= getWeather;

async function getWeather(city) {
    let city = req.query.city
    let key = process.env.WEATHER_KEY;
    // let key = `500b0343d93143769c99731a1b47346f`;

    // test URL: https://api.weatherbit.io/v2.0/forecast/daily?city=Amman&key=500b0343d93143769c99731a1b47346f
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${key}`

    return axios.get(url)
    .then(result =>{
        const weatherArray = result.data.data.map(Item=>{
                    return new Forecast(Item)})
                    return weatherArray
    })
    


}

class Forecast {

    constructor(arrData) {

        this.date = arrData.valid_date
        this.descrption = arrData.weather.description;
        // this.date = date;
        // this.description= description;
    }
}

