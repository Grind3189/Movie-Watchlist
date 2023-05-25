let movieHtml = ``
let id = []
let moviesFromStorage = [] 
const watchlistContainer = document.getElementById('watchlist-container')

 checkStorage() 

 function checkStorage(){
     moviesFromStorage = JSON.parse(localStorage.getItem('movies'))
     moviesFromStorage? setHtml(): setPlaceholder()
 }
 
 document.addEventListener('click',function(e){
     if (e.target.dataset.id){
         moviesFromStorage = moviesFromStorage.filter((movie) =>
         movie.imdbID != e.target.dataset.id)
        localStorage.clear()
        if (moviesFromStorage.length > 0){
             localStorage.setItem('movies', JSON.stringify(moviesFromStorage))
             checkStorage()
        } else {
            setPlaceholder()
        }
     }
 })

function render(){
    watchlistContainer.innerHTML = movieHtml
}

function setPlaceholder(){
       let placeholder = `<div class="watchlist-placeholder">
                            <h4>Your watchlist is looking a little empty...</h4>
                            <a href="index.html" class="add-movies">
                             <span>+</span>
                             Let's add some movies!</a>
                       </div>`
        watchlistContainer.innerHTML = placeholder
}

function setHtml(){
    movieHtml = ``
    moviesFromStorage.forEach(function(movie){
        const {Poster,Title,imdbRating,Runtime,Genre,imdbID,Plot} = movie
        id.push(imdbID)
        movieHtml += `
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
                                <button class="btn-removeList" data-id="${imdbID}">
                                -
                                </button>
                                <p>Remove</p>
                            </div>
                            <div class="lower-container">
                                <p>${Plot}</p>
                            </div>
                        </div>
                    </div>
                `
    })
    render()
}
