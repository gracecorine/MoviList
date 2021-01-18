//function to fetch list movie of now playing from API
export const getMovies = () => {
    return async (dispatch) => {
        const fetchMovie = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=<YOUR_API_KEY>&language=en-US')
        const movies = await fetchMovie.json()
        dispatch({
            type: 'SET_MOVIES',
            movies: movies.results
        })
    }
}

//function to fetch list related movie from related id, id from args that send when the function is called
export const getRelatedMovies = (id) => {
    return async (dispatch) => {
        const fetchRelatedMovies = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=<YOUR_API_KEY>&language=en-US`)
        const relatedMovies = await fetchRelatedMovies.json()

        let results = relatedMovies.results
        //to check related movies, if there are no related movie then it will not be displayed on detail page
        if(results.length===0) results = null

        dispatch({
            type: 'SET_RELATED_MOVIES',
            relatedMovies: results
        })
    }
}

//function to set movie, from movie data(args) that get when the function is called
export const getMovie = (movie) => {
    return async (dispatch) => {
        await dispatch({
            type: 'SET_MOVIE',
            movie
        })
    }
}
