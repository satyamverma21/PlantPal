/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState } from 'react';
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    TouchableOpacity,
    SafeAreaView,
    ScrollView

} from 'react-native'
import { useNavigation } from '@react-navigation/native'; 

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const cards = [{
    id: 0,
    img: "image1",
    name: "Tulsi",
    contact: 'email1',
    onClick: () => {
        Alert.alert(`${cards[0].img} \n ${cards[0].name} \n ${cards[0].contact}`);
    }
},
{
    id: 1,
    img:'image2',
    contact: 'email2',
    name: "Detect Disease of Plant",
    onClick: () => {
        Alert.alert('debug msg 2.');
    }
},
{
    id: 2,
    img:'image2',
    contact: 'email2',
    name: "Detect Disease of Plant",
    onClick: () => {
        Alert.alert('debug msg 2.');
    }
},
{
    id: 3,
    img:'image2',
    contact: 'email2',
    name: "Detect Disease of Plant",
    onClick: () => {
        Alert.alert('debug msg 2.');
    }
},
{
    id: 4,
    img:'image2',
    contact: 'email2',
    name: "Detect Disease of Plant",
    onClick: () => {
        Alert.alert('hii');
    }
},


];

const cardComponent = (card: Object) => {
    return (
        <TouchableOpacity key={card.id} style={Style.card} onPress= {card.onClick}>
            <Text style={{ color: '#909090', fontWeight: 'bold', fontSize: 15 }}>
                {card.msg}
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                Plant image Placeholder {card.img}
            </Text>


            <Button
                title="Mark as sold."
    
                color="#71a93c"
            />
        </TouchableOpacity>
    )
}

function Market(): JSX.Element {
    const navigation = useNavigation(); 

    return (
        <View style={Style.main}>
            <ScrollView>
                {cards.map(card => cardComponent(card))}
            </ScrollView>

            <View style={{ flex: 0, width: '75%', flexDirection: 'row', justifyContent: 'space-around' }}>

                <TouchableOpacity onPress={() => {navigation.navigate("Market") }}
                    style={[Style.container, Style.btn]}>
                    <Text style={{ fontWeight: 'bold', }}  >Marketplace</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=> {navigation.navigate("Sellplant")}}
                    style={[Style.container, Style.btn]}>
                    <Text style={{ fontWeight: 'bold', }} >Sell My Plant</Text>
                </TouchableOpacity>
              
            </View>
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

export default Market