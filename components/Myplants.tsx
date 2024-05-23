/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import axios from 'axios'

import { useState } from 'react';
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image

} from 'react-native'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';


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
    img: 'image2',
    contact: 'email2',
    name: "Detect Disease of Plant",
    onClick: () => {
        Alert.alert('debug msg 2.');
    }
},

{
    // username 
    // name 
    // price 
    // contact 
    // additional
    // file 
}

];
const url = "http://192.168.1.3:3000"

const cardComponent = (card: Object) => {
    // console.log("card: ", card)
    if (!card._id) return (<Text style={{ color: '#909090', fontWeight: 'bold', fontSize: 15, position: 'absolute' }}>
        No Plant Data
    </Text>)
    return (
        <TouchableOpacity key={card._id} style={Style.card} onPress={() => { 
            Alert.alert(
                'User: '+ card.username,  // Title
                `Plant: ${card.name}.\nPrice: ${card.price} Rs.\nContact: ${card.contact}.\Additioanl Info: ${card.additional}.`,  // Message
                [
                  {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed')
                  }
                ],
                { cancelable: true }
              );
        }}>

            <Image
                style={{ flex: 1, width: "98%" }}
                source={{ uri: url + card.file, }}
            />

            <TouchableOpacity
                style={[Style.container, Style.btn, { position: 'absolute', bottom: 10, backgroundColor: '#009F6B' }]}>
                <Text style={{ fontWeight: 'bold', }}  > {card.name}</Text>
            </TouchableOpacity>

        </TouchableOpacity>
    )
}

function Myplants(): JSX.Element {
    const navigation = useNavigation();
    const [market, setMarket] = useState([{}]);
    const [dataLoaded, setdataLoaded] = useState(false);



    const loadData = async () => {

        if (!dataLoaded) {
            try {
                const { data } = await axios.get(url + '/myMarket', {

                    params: {
                        id: await AsyncStorage.getItem('username'),
                    }
                })
                setMarket(data.data);
                console.log(market)
                setdataLoaded(true)


            } catch (error) {
                console.log(error)
            }
        }
    }

    loadData()

    return (
        <View style={Style.main} >

            <ScrollView>
                {market.map(card => cardComponent(card))}
            </ScrollView>

            <View style={{ flex: 0, width: '75%', flexDirection: 'row', justifyContent: 'space-around' }}>

                <TouchableOpacity onPress={() => { navigation.navigate("Sellplant") }}
                    style={[Style.container, Style.btn]}>
                    <Text style={{ fontWeight: 'bold', }}  >Sell My Plant</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("Home") }}
                    style={[Style.container, Style.btn]}>
                    <Text style={{ fontWeight: 'bold', }}  >Back to home</Text>
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

export default Myplants