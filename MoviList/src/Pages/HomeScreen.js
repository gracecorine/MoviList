import React, { useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getMovies } from '../Stores/Actions/MovieAction.js'
import { FlatList } from 'react-native-gesture-handler'
import { Appbar } from 'react-native-paper';
import MovieCard from '../Components/Card.js'

const windowWidth = Dimensions.get("window").height

const HomeScreen = ({navigation}) => {

    const dispatch = useDispatch()
    //get array of movies from stores
    const { movies } = useSelector(state => state.MovieReducers)

    useEffect(() => {
        //fetch movies from API
        dispatch(getMovies())
    }, [dispatch])

    //Loading
    if(movies.length === 0) {
        return (
            <ActivityIndicator
                size="large"
                color="#bc2b78"
                style={styles.activityIndicator}/>
        )
    }

    return (
        <>
        <View>
            {/* Appbar */}
            <Appbar.Header style={styles.backgroundAppBarHeader}>
                <Appbar.Content titleStyle={styles.contentAppBar} title={'MoviList'} subtitle='Now Playing' />
            </Appbar.Header>
        </View>
        <View style={styles.container}>
            {/*  using Flatlist To Display movie list of now playing set columns on 2 */}
            <FlatList
                numColumns={2}
                columnWrapperStyle={styles.card}
                data={movies}
                renderItem={ ({item}) => {
                    return <MovieCard movie={item} navigation={navigation} />
                }}
                keyExtractor={(movie) => `${movie.id}`}
            />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#2C3E50',
      flex: 1,
      flexDirection: 'row'
    },
    card: {
        paddingHorizontal: 20,
        justifyContent: 'space-evenly'
    },
    activityIndicator: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       height: 80,
       backgroundColor: '#2C3E50'
    },
    backgroundAppBarHeader: {
        backgroundColor: '#094352'
    },
    contentAppBar: {
        fontSize: Math.ceil(windowWidth/30)
    }
  });


export default HomeScreen