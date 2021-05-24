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
    let lonData = req.query.lon
    let latData = req.query.lat
    let cityData;

    let Items = weatherData.find(item => {
        if (item.city_name.toLowerCase() == cityName.toLowerCase() && item.lat == latData && item.lon == lonData){
        cityData = new Forecast(item)
            return item
        }
    })

    // console.log(cityName,lonData,latData);
    res.send(cityData)

    // && item.lat == latData && item.lon == lonData
})
    

 
class Forecast {
    
    constructor(arrData){
        
        this.data =arrData.data.map(item =>{
           let low = 'low of '+item.low_temp;
           let high = 'high of '+item.max_temp;

            return {'description': low+high + 'with' + item.weather.description,'date':item.datetime}
        })
        // this.date = date;
        // this.description= description;
    }  

    
}
// let day1 = new Forecast(Items.data.datetime,Items.data.weather.description)


// class Forecast {
    
//     constructor(date,description){
 
//         this.date = date;
//         this.description= description;
//     }


 
//  }

// // http://localhost:3001/weather?city_name=Seattle
// server.get('/weather',(req,res) =>{
    
//     console.log(req.query);
  

//     let cityNameData = req.query.city_name

//     let cityItem = weatherData.find( item =>{
//         if(item.city_name == cityNameData){
//             return item
//         }
//         res.send(cityItem)
//     })
// })

// // http://localhost:3001/weather?lon
// server.get('/weather',(req,res) =>{
//     console.log(req.query);

//     let cityLonData = req.query.lon

//     let cityItem = weatherData.find( item =>{
//         if(item.lon == cityLonData){
//             return item
//         }
//         res.send(cityItem)
//     })
// })

// // http://localhost:3001/weather?lat
// server.get('/weather',(req,res) =>{
//     console.log(req.query);

//     let cityLatData = req.query.lat

//     let cityItem = weatherData.find( item =>{
//         if(item.lan == cityLatData){
//             return item
//         }
//         res.send(cityItem)
//     })
// // })




server.get('*', (req,res) =>{
    res.send('Not Found')
});