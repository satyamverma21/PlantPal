import { useState } from 'react';
import React from 'react'
import {
    View, Text, StyleSheet, Button, Alert, TouchableOpacity, ScrollView, ImageBackground, Linking, Image
} from 'react-native'

import { useNavigation } from '@react-navigation/native';



function Dicease({ route }): JSX.Element {
    const data = route.params.data;
    const diceaseDetail = data.disease.suggestions[0];
    console.log(data)
    // console.log("debug: props: ", data.details)
    // data [ suggestions , is_plant, is_healthy]



    const navigation = useNavigation();
    return (
        <ScrollView>
            <View style={Style.main}>

       

                <Text style={[Style.border, Style.text, { color: "#7bb642" }]}>
                    <Text style={[Style.text, { color: "#8d6042" }]}>Plant health status: </Text >
                    {data.is_healthy.binary? "Healthy":"Deceased"} ({Math.floor(data.is_healthy.probability*100)}%) 
                </Text>


                <Text style={[Style.border, Style.text, { color: "#7bb642" }]}>
                    <Text style={[Style.text, { color: "#8d6042" }]}>Dicease name: </Text >
                    {(diceaseDetail.name)?? "Information not available"} ({Math.floor(diceaseDetail.probability*100)}%) 
                </Text>

                <Text style={[Style.border, Style.text, { color: "#7bb642" }]}>
                    <Text style={[Style.text, { color: "#8d6042" }]}>Commonly known: </Text >
                    {diceaseDetail.details.common_names? (diceaseDetail.details.common_names).join(', ') : "Information not available"}
                </Text>


                <Text style={[Style.border, Style.text, { color: "#7bb642", textAlign: 'justify', }]} onPress={() => Linking.openURL(diceaseDetail.details.url)} >
                    <Text style={[Style.text, { color: "#8d6042" }]}>Desciption: {'\n'}</Text >
                    {diceaseDetail.details.description ?? "Information not available"}
                </Text>

                <Text style={[Style.border, Style.text, { color: "#7bb642" }]}>
                    <Text style={[Style.text, { color: "#8d6042" }]}>Cause: </Text >
                    {(diceaseDetail.details.cause) ?? "Information not available"}
                </Text>

                {Object.keys(diceaseDetail.details.treatment).map((key) => (
                    <Text style={[Style.border, Style.text, { color: "#7bb642" }]}>
                        <Text style={[Style.text, { color: "#8d6042" }]}>{key} steps: </Text >
                        {diceaseDetail.details.treatment[key] ?? "Information not available"}
                    </Text>
                ))}

            </View>
        </ScrollView>
    )
}

const Style = StyleSheet.create({

    card: {

        flex: 0,
        height: 250,
        width: '100%',
        borderRadius: 15,



    },

    main: {

        flex: 1,
        fontWeight: "bold",
        borderTopColor: '#8d6042',
        padding: 20,
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
    border: {
        borderWidth: 2,
        borderRadius: 8,
        borderColor: "#8d6042",
        borderStyle: 'dashed',
        marginVertical: 15,
        padding: 12,

    },
    text: {
        // color: "#7bb642",
        fontSize: 18,
        width: '100%',
        justifyContent: 'space-evenly',
        fontWeight: "bold",
    }

})

export default Dicease