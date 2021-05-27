'user strict'; 
const axios = require('axios');

module.exports = getMovie;

let movieInMemory ={};

async function getMovie(req, res) {

    let movie = req.query.query

    let key1 = process.env.MOVIE_API_KEY;

    // test URL: https://api.themoviedb.org/3/search/movie?api_key=436281052c009396f1046ba27be009e1&query=amman   
    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key1}&query=${movie}`

    if(movieInMemory[movie] !== undefined ){
        console.log('get the data from the Memory')
        res.send(movieInMemory[movie])

    }else{
        console.log('get the data from the API');
        try {
            const movieResult = await axios.get(url);
            const movieArray = movieResult.data.results.map(Item => {
                return new Movie(Item)
            })

            movieInMemory[movie] = movieArray
            res.send(movieArray);
    
        } catch (error) {
            console.log(error)
            res.status(500).send(`error in getting the movie data ==> ${error}`);
        }
    }



}

class Movie {

    constructor(item) {

        this.title = item.original_title
        this.overview = item.overview
        this.average_votes = item.vote_average
        this.total_votes = item.vote_count
        this.image_url = item.poster_path
        this.popularity = item.popularity
        this.released_on = item.release_date


    }


}


