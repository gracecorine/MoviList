import React from 'react'
import { View, Text, Dimensions, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import { Card, Subheading } from 'react-native-paper';
import { useDispatch } from 'react-redux'
import { getMovie, getRelatedMovies } from '../Stores/Actions/MovieAction.js'

const windowWidth = Dimensions.get("window").width
const windowHeight = Dimensions.get("window").height

const MovieCard = ({movie, navigation}) => {

    const dispatch = useDispatch()

    const goToDetail = async () => {
        //Fetch data to API to stores
        await dispatch(getRelatedMovies(movie.id))
        //Save movie detail to stores, because we need the data before go to detail
        await dispatch(getMovie(movie))
        //move the page to detail page
        navigation.navigate("MovieDetail")
    }

    return (
        //put margin so there will be a distance from top and bottom card
        <View style={styles.marginBetweenCard}>
            <Card style={styles.cardStyling}>
                <Card.Actions>
                    <TouchableOpacity onPress={goToDetail}>
                        <ImageBackground
                        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}}
                        style={styles.imageStyle}>
                            <View
                            style={styles.viewTextStyle}>
                                <Subheading style={styles.textMovie}>{movie.title}</Subheading>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </Card.Actions>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: Math.ceil((windowWidth * (95/100))/2.4),
        height: Math.ceil(windowHeight/3)
    },
    viewTextStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    textMovie: {
        backgroundColor:'white',
        opacity:0.8,
        fontSize: Math.ceil(windowWidth * (3/100)),
        paddingHorizontal: 5
    },
    marginBetweenCard: {
        marginVertical: 1
    },
    cardStyling: {
        marginRight: 10,
        backgroundColor: '#484d5c',
        borderRadius: 5
    }
  });

export default MovieCard