import { useState } from 'react';
import React from 'react'
import {
    View, Text, StyleSheet, Button, Alert, TouchableOpacity, ScrollView, ImageBackground
} from 'react-native'

import { useNavigation } from '@react-navigation/native';



function Plantnet({ route }): JSX.Element {
    const { data } = route.params


    const navigation = useNavigation();
    return (
        <View style={Style.main}>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                Confidence level : {data.score}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                Commonly known as : {data.species.commonNames}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                Scientific name: {data.species.scientificName}
            </Text>
        </View>
    )
}

const Style = StyleSheet.create({

    card: {

        flex: 0,
        height: 220,
        width: 280,
        margin: 12,
        borderRadius: 10,
        borderWidth: 3, // You can adjust the width of the border
        borderColor: '#505050', // Adjust the color of the border
        borderStyle: 'dashed',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    main: {
        flex: 1,
        alignItems: 'center',
        fontWeight: "bold",
        borderTopColor: '#8d6042',
        padding: 10,
    },
    container: {
        // flex: 1,
        // margin:5,
        padding: 1,
        flexDirection: 'row',
    },

    bg: {
        alignItems: 'center',
        flex: 1,
    },

    logo: {
        flex: 0,
        marginVertical: 20,
        alignItems: "center",
        width: 380,
        height: 180,
        resizeMode: 'contain',
    },

    btn: {
        alignItems: "center",
        backgroundColor: "#8d6042",
        padding: 10,
        borderColor: "#505050",
        borderWidth: 2,
        marginVertical: 20,
        borderRadius: 5,
    },

})

export default Plantnet