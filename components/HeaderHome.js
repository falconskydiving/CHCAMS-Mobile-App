import React, { Component } from 'react';
import { Image,View, StyleSheet, TouchableWithoutFeedback, Alert} from 'react-native';

export default function HeaderHome() {
        return (
            <TouchableWithoutFeedback >
            <View>
                    <Image 
                        source = {
                            require('../assets/images/home.png')
                        }
                        style={styles.homeBtn}
                    />
            </View>
            </TouchableWithoutFeedback>
        )
} 

const styles = StyleSheet.create({
    homeBtn:{
        resizeMode: 'contain',
        height: 40,
        width: 68,
    }
})