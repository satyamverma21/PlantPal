import React, { useState } from 'react'

import {useNavigation} from "@react-navigation/native"
import Signin from './Signup';
import {
    View,
    Text,
    StyleSheet
} from 'react-native'



function Navigator({navigation}): JSX.Element {

    return (
            
            <View style={Style.container} >
                <Text>Scan</Text>
                <Text>Shop</Text>
                <Text>Sell</Text>
                <Text
                onPress={
                    ()=> navigation.navigate("Signin")
                    // ()=>{}
                }
                
                >IoT</Text>
               

            </View>
    )

}

const Style = StyleSheet.create({

    container: {
        height: 60,
        position: 'absolute',
        bottom: 16,
        right: 16,
        left: 16,
        borderRadius: 10,
        borderColor: "#71a93c",
        borderWidth: 2,
        padding: 2,
        backgroundColor: "#402b1e",
        flex:0,
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection: 'row'

    },

})
export default Navigator
