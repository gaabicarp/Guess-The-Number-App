import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import Colors from '../constants/colors'

const MainButton = props => {
    return(
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={Styles.button}>
                <Text style={Styles.buttonText}>
                    {props.children}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const Styles = StyleSheet.create({
    button:{
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 26
    },
    buttonText:{
        color: 'white',
        fontSize: 18
        
    }
})

export default MainButton