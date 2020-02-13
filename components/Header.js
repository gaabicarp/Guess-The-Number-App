import React from 'react'
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native'

import Colors from '../constants/colors'
import TitleText from './TitleText'

const Header = props => {
    return (
        <View style={styles.header}>
            <TitleText>{props.title}</TitleText>
        </View>
    );
};


const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: Dimensions.get('window').height / 5,
        paddingTop: 10,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: Platform.OS === 'ios' ? '#ccc' : 'transparent',
        borderBottomWidth: Platform.OS === 'ios' ? 1 : 0
        
    },
    headerTitle:{
        color:'black',
        fontSize: 18
    }
});

export default Header;