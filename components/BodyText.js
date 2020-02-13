import React from 'react'
import {Text, StyleSheet } from 'react-native';
import { fonts } from '../constants/fonts';

const BodyText = props => <Text style={{...Styles.body, ...props.style}}>{props.children}</Text>

const Styles = StyleSheet.create({
    body:{
        fontFamily: fonts.OpenSans
    }
})

export default BodyText