import React from 'react';
import { Image,View, Dimensions, StyleSheet} from 'react-native';

export default function HeaderLogo() {
    return (
        <View>          
                <Image 
                    source = {
                        require('../assets/images/FQHC-logo.png')
                    }
                    style={styles.logoText}
                />
        </View>
    )
} 

const styles = StyleSheet.create({
    logoText: {
        resizeMode: 'contain',
        height: 40,
        width: 68,
        left: 15,
    },
})