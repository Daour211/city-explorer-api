'use strict'; 

const express = require('express');
const weatherData = require('./data/weather.json');
const cors = require('cors');
require('dotenv').config();

const server = express();
server.use(cors());

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Listening on PORT `);
})

server.get('/', (req,res) =>{
    res.send('HELLO from Home Route')
});

// server.get('/test', (request, response) => {
   
//     response.send('string');
// })




// http://localhost:3001/getCity?city_name=Amman
server.get('/weather', (req, res) => {
    console.log(req.query)
    
    let cityName= req.query.city_name
    // let lonData = req.query.lon
    // let latData = req.query.lat
    let cityData;

    let Items = weatherData.find(item => {
        if (item.city_name.toLowerCase() == cityName.toLowerCase() ){
            return item
        }
    })

   try{
       let forecastArr= Items.data.map(item =>{
           return new Forecast(item)
       })
       res.send(forecastArr)
   }
   catch{
       res.send('Error: The weather info for the city you searched for is not available')
   }

    
})
    

 
class Forecast {
    
    constructor(arrData){
        
        this.date = arrData.valid_date
        this.descrption = arrData.weather.description;
        // this.date = date;
        // this.description= description;
    }  

    
}


server.get('*', (req,res) =>{
    res.send('Not Found')
});