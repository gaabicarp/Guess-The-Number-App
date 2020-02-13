import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native'

import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/input'
import NumberContainer from '../components/NumberContainer'
import { fonts } from '../constants/fonts'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import MainButton from '../components/MainButton'

const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [SelectedNumber, setSelectedNumber] = useState('')
    const [ButtonWidth, setButtonWidth] = useState(Dimensions.get('window').width /4)

    useEffect(()=>{
        const updateLayout = () => {
            setButtonWidth(Dimensions.get('window').width / 4);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () =>{
            Dimensions.removeEventListener('change', updateLayout)
        }

    })

    const InputValueHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const ResetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const ConfirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number', 'Number has to be a number between 1 and 99.', [{ text: 'Okey', style: 'destructive', onPress: ResetInputHandler }])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('')
        Keyboard.dismiss()

    }

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{SelectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(SelectedNumber)}>
                    START GAME
            </MainButton>
            </Card>
        )
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss()
                }}>
                    <View style={styles.screen}>
                        <TitleText>The Game Screen!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="number-pad" maxLength={2} onChangeText={InputValueHandler} value={enteredValue} />
                            <View style={styles.buttonContainer}>
                                <View style={{width: ButtonWidth}}><Button title="reset" onPress={ResetInputHandler} color={Colors.accent} /></View>
                                <View style={{width: ButtonWidth}}><Button title="confirm" onPress={ConfirmInputHandler} color={Colors.primary} /></View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: fonts.OpenSansBold
    },
    inputContainer: {
        width: '80%',
        minWidth: 300,
        maxWidth: '95%',
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: Dimensions.get('window').width / 4
    },
    input: {
        width: 50,
        textAlign: 'center',
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'

    }
});

export default StartGameScreen;