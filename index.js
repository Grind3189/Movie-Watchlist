import {changeIcon} from './utils.js'
let movieHtml = ``
let imdbID = []
let addedID = []
let movieToWatchlist = []
const apiKey = "ca24e105"
const movieContainer = document.getElementById('movie-container')

     if (JSON.parse(localStorage.getItem('watchlistID'))){
        addedID = JSON.parse(localStorage.getItem('watchlistID'))
    }
    
    function searchTitle(){
          const inputSearch = document.getElementById('search-input')
          fetch(`https://www.omdbapi.com/?s=${inputSearch.value}&apikey=${apiKey}&plot=full&type=movie`)
            .then(res => res.json())
            .then(movies => {
                    if (movies.Response === 'True') {
                         movies.Search.forEach((movie) => {     
                            imdbID.push(movie.imdbID) 
                            searchID(movie.imdbID)
                        })
                    } else {
                        errorMess()
                    }
            })      
    }
    
    function searchID(id){
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}&plot=short&type=movie`)
            .then(res => res.json())
            .then(movie => {
                movieHtml += getHtml(movie)
                renderMovies()
            })
    }
     function errorMess(){
        const errorMessage = `
                <h3 class="error-message">Unable to find what you're looking for.
                Please try another search</h3>`
        movieContainer.innerHTML = errorMessage
    }
    function getHtml(movie){
        const {Poster,Title,imdbRating,Runtime,Genre,imdbID,Plot} = movie
        return `
                    <div class="movie-container">
                            <div>
                                <img src=${Poster} class="movie-poster">
                            </div>
                        <div>
                            <div class="upper-container">
                                <h4>${Title}</h4>
                                <img src="images/star.png">
                                <p>${imdbRating}</p>
                            </div>
                            <div class="mid-container">
                                <p>${Runtime}</p>
                                <p>${Genre}</p>
                                <button class="btn-watchlist" 
                                data-id="${imdbID}" id="${imdbID}">
                                +
                                </button>
                                <p id="${imdbID}-status">Watchlist</p>
                            </div>
                            <div class="lower-container">
                                <p>${Plot}</p>
                            </div>
                        </div>
                    </div>
                     `
    }
    
    function renderMovies(){
        movieContainer.innerHTML = movieHtml
    }
    
    function getMovie(id){
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}&plot=short&type=movie`)
            .then(res => res.json())
            .then(foundMovie => {
                if (JSON.parse(localStorage.getItem('movies'))){
                    movieToWatchlist = []
                    let movieFromStorage = JSON.parse(localStorage.getItem('movies'))
                    movieFromStorage.forEach((movie) => movieToWatchlist.push(movie))
                }
                const {Poster,Title,imdbRating,Runtime,Genre,imdbID,Plot} = foundMovie
                movieToWatchlist.unshift({
                    Poster: Poster,
                    Title: Title,
                    imdbRating: imdbRating,
                    Runtime: Runtime,
                    Genre: Genre,
                    imdbID: imdbID,
                    Plot: Plot
                })
                localStorage.setItem("movies", JSON.stringify(movieToWatchlist))
            })
    }
    
    document.addEventListener('click', function(e){
        if (e.target.id === 'search-btn'){
            movieHtml = ``
            searchTitle()
        }
        if (e.target.dataset.id){
            let duplicate = false
            changeIcon(e.target.dataset.id)
            for (let i=0; i < addedID.length; i++){
                if (e.target.dataset.id === addedID[i]){
                    duplicate = true
                }
            }
            if (!duplicate) {
                addedID.push(e.target.dataset.id)
                localStorage.setItem('watchlistID', JSON.stringify(addedID))
                getMovie(e.target.dataset.id)
            }
        }
    })
   
