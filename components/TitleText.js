import React from 'react'
import {Text, StyleSheet } from 'react-native';
import { fonts } from '../constants/fonts';

const TitleText = props => { 
    return(<Text style={{...Styles.Title, ...props.style}}>{props.children}</Text>)}

const Styles = StyleSheet.create({
    Title:{
        fontFamily: fonts.OpenSansBold,
        fontSize: 18
    }
})

export default TitleText 