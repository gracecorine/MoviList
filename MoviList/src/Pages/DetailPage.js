import React, { useEffect, useState } from 'react'
import { ScrollView, Image, StyleSheet, Dimensions, FlatList, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Appbar, Subheading, Headline } from 'react-native-paper';
import MovieCard from '../Components/Card.js'

const windowHeight = Dimensions.get("window").width
const windowWidth = Dimensions.get("window").height

const DetailPage = ({ navigation }) => {
    //get selected movie from stores
    const { movie, relatedMovies } = useSelector(state => state.MovieReducers)
    const [releaseYear, setReleaseYear] = useState('')
    //in case there is an error it will redirect to homepage
    if(!movie.title) {
        navigation.navigate("MoviList")
    }

    const release_date = movie.release_date

    useEffect(() => {
        let year = ''
        for (let i = 0; i < 4; i++) {
            year += release_date[i]
        }
        setReleaseYear(year)
    }, [movie])



    //function back on screen
    const goBack = () => {navigation.navigate("MoviList")}

    return (
        <>
        <View>
            <Appbar.Header style={styles.backgroundAppBar}>
                <Appbar.BackAction onPress={goBack} />
                <Appbar.Content titleStyle={styles.contentAppBar} title={movie.title} subtitle={release_date} />
            </Appbar.Header>
        </View>

        <ScrollView style={styles.backgroundScreen}>
            <View style={styles.imageCentering}>
                <View style={styles.shadow}>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`}}
                        style={styles.imageStyle} />
                </View>

                {/* Displaying description of the movie, using view to add background color */}
                <View style={styles.textBackground}>
                    <Headline style={styles.textColorHeadLine}>{movie.title}</Headline>
                    <Subheading style={styles.textColorHeadLine}>Release Year : {releaseYear}</Subheading>
                    <Subheading style={styles.colorSubheading}>{movie.overview}</Subheading>
                </View>

                {/* if there is relatedMovies from stores then display the list to horizontal mode */}
                {
                    relatedMovies &&
                    <>
                        <Headline style={styles.textColorHeadLine}>Related Movies</Headline>
                        <FlatList
                        horizontal={true}
                        data={relatedMovies}
                        renderItem={ ({item}) => {
                            return <MovieCard movie={item} navigation={navigation} />
                        }}
                        keyExtractor={(movie) => `${movie.id}`}
                        />
                    </>
                }

            </View>
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    imageStyle: {
        width: Math.ceil(windowWidth/3),
        height: windowHeight,
        borderRadius: 5
    },
    shadow: {
        marginVertical: 5,
        paddingRight: 4,
        paddingBottom: 5,
        backgroundColor: '#5e6579',
        borderRadius: 5
    },
    textBackground: {
        backgroundColor:'grey',
        opacity:0.7,
        marginBottom: 10,
        marginTop: 5,
        padding: 8
    },
    textColorHeadLine: {
        color: '#ffce00'
    },
    backgroundAppBar: {
        backgroundColor: '#094352'
    },
    backgroundScreen: {
        backgroundColor: '#2C3E50'
    },
    colorSubheading: {
        color: 'white'
    },
    imageCentering: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentAppBar: {
        fontSize: Math.ceil(windowWidth/40)
    }
})

export default DetailPage