import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, Button, Alert, TouchableWithoutFeedback, FlatList, Dimensions } from 'react-native'

import NumberContainer from '../components/NumberContainer'
import Card from '../components/Card'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = (Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    }
    return parseInt(rndNum);
};

const renderListItem = (listLength, itemData) => (
    <View style={Styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
);

const GameScreen = props => {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuesses, setPassGuesses] = useState([initialGuess.toString()]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width)
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height)
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const {userChoice, onGameOver} = props;

    useEffect(()=>{
        const updateLayout = () =>{
            setAvailableDeviceHeight(Dimensions.get('window').height);
            setAvailableDeviceWidth(Dimensions.get('window').width);
        }
        Dimensions.addEventListener('change', updateLayout);

        return() =>{
            Dimensions.removeEventListener('change', updateLayout)
        }
    })

    useEffect((() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }), [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Dont lie!', 'You know that this is wrong...', [{ text: 'Sorry!', style: 'cancel' }])
            return;
        }
        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        // setRounds(currentRounds => currentRounds + 1)
        setPassGuesses(currPastGGuesses => [nextNumber.toString() , ...currPastGGuesses])
    }

    let listContainerStyle = Styles.listContainer

    if (availableDeviceWidth <350){
        listContainerStyle = Styles.listContainerBig
    }

    if (availableDeviceHeight < 500){
        return (
            <View style={Styles.scren}>
                <Text>Opponent's Guess</Text>
                <View style={Styles.controls}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>LOWER</MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>GREATER</MainButton>
                </View>
                <View style={listContainerStyle}>
                    <FlatList keyExtractor={item => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} style={Styles.list}/>
                </View>
            </View>
        )
    }
    return (
        <View style={Styles.scren}>
            <Text>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={Styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>LOWER</MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>GREATER</MainButton>
            </Card>
            <View style={Styles.listContainer}>
                <FlatList keyExtractor={item => item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} style={Styles.list}/>
            </View>
        </View>
    )

}

const Styles = StyleSheet.create({
    scren: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').width > 600 ? 20 : 5,
        width: 400,
        maxWidth: '80%'
    },
    list:{
        flexGrow: 1,
    },
    controls:{
        flexDirection:'row',
        justifyContent: 'space-around',
        width: '80%',
        alignItems: 'center'
    },
    listItem:{
        borderColor:'black',
        borderWidth: 1,
        padding:15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    listContainer:{
        flex: 1,
        width: '80%'
    },
    listContainerBig:{
        flex: 1,
        width: '60%'
    }
})

export default GameScreen