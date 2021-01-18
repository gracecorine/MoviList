const initMovie = {
    movies: [],
    movie: {},
    relatedMovies: []
}

const MovieReducer = (state=initMovie, action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return { ...state, movies: action.movies }
        case 'SET_MOVIE':
            return { ...state, movie: action.movie }
        case 'SET_RELATED_MOVIES':
            return { ...state, relatedMovies: action.relatedMovies}
        default:
            return state;
    }
}

export default MovieReducer