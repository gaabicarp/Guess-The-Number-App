import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView } from 'react-native'

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

const GameOverScreen = props => {
    return (
        <ScrollView>
        <View style={Styles.screen}>
            <TitleText>The Game is Over!</TitleText>
            <View style={Styles.imageContainer}>
                <Image
                    source={require('../assets/success.png')}
                    //source={{uri: link}}
                    style={Styles.image}
                    resizeMode="cover"
                />
            </View>

            <View style={Styles.resultContainer}>
                <BodyText style={Styles.resultText}>
                    Your phone needed <Text style={Styles.higlight}>{props.roundsNumber}</Text> rounds to guess the number <Text>{props.userNumber}</Text>.
                </BodyText>
            </View>

            <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
        </View>
        </ScrollView>
    )
};

const Styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        width: Dimensions.get('window').width * 0.5,
        height: Dimensions.get('window').width * 0.5,
        borderRadius: Dimensions.get('window').width * 0.5 /2,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image: {
        width: '100%',
        height: '100%',
    },
    higlight: {
        color: Colors.primary
    },
    resultContainer:{
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    },
    resultText:{
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 600 ? 16 : 20
    }
})

export default GameOverScreen