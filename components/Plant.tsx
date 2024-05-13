import { useState } from 'react';
import React from 'react'
import {
    View, Text, StyleSheet, Button, Alert, TouchableOpacity, ScrollView, ImageBackground
} from 'react-native'

import CheckBox from '@react-native-community/checkbox';
import ImagePicker from "react-native-image-crop-picker";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'



function Plant(): JSX.Element {

    const [isGallerySelected, setGallerySelection] = useState(true);
    const [bgImages, setbgImage] = useState(['', '']);

    const cards = [{
        id: 0,
        msg: "Detect Species of Plant",
    },
    {
        id: 1,
        msg: "Detect Disease of Plant",
    },
    ];

    async function getImage(index) {

        const updateBackground = (index, img) => {
            const newArrayState = [...bgImages];
            newArrayState[index] = img;
            setbgImage(newArrayState);
        };

        if (bgImages[index] !== '') {
            updateBackground(index, '');
            return;
        }

        try {
            const action = isGallerySelected ? ImagePicker.openPicker : ImagePicker.openCamera;
            const img = await action(
                {
                    width: 300,
                    height: 400,
                    multiple: false,    
                    cropping: true,
                }
            )
            updateBackground(index, {
                uri: img.path,
                type: img.mime,
                name: "image"+index+'_'+Math.floor(Math.random() * 100),
            });
            console.log("keys: ", Object.keys(img))
            console.log(img.mime, img.filename)
        } catch (error) {
            console.log(' Error fetching images', error);
        }

    }

    const cardComponent = (card: Object) => {
        return (
            <ImageBackground key={card.id} style={[Style.card, {}]}
                resizeMode="cover"
                source={{ uri: bgImages[card.id].uri }}
            >
                <TouchableOpacity key={card.id} style={Style.card} onPress={() => { getImage(card.id) }}>
                    <Text style={{ color: '#909090', fontWeight: 'bold', fontSize: 15 }}>
                        {card.msg}
                    </Text>
                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                        Touch to capture plant
                    </Text>

                    <Button
                        title="Submit"

                        onPress={async () => {
                            if (bgImages[card.id] !== '') {
                                const formData = new FormData();
                                formData.append('image', bgImages[card.id]);
                                try {
                                    const response = await axios.post('http://192.168.1.8:3000/', formData, {
                                        headers: {
                                            'Content-Type': 'multipart/form-data',
                                        }
                                    });
                                    Alert.alert(response.data.msg);

                                } catch (err) {
                                    console.log(err)
                                }
                            } else {
                                Alert.alert('be faltu ki hein !!');
                            }
                        }}
                        color="#71a93c"
                    />
                </TouchableOpacity>
            </ImageBackground>
        )
    }


    const navigation = useNavigation();
    return (
        <View style={Style.main}>
            <ScrollView>
                {cards.map(card => cardComponent(card))}
            </ScrollView>
            <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                <CheckBox
                    value={isGallerySelected}
                    onValueChange={setGallerySelection}

                />
                <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Select image from gallery</Text>
            </View>
            <View style={{ flex: 0, width: '75%', flexDirection: 'row', justifyContent: 'space-around' }}>

                <TouchableOpacity onPress={() => { navigation.navigate("Market") }}
                    style={[Style.container, Style.btn]}>
                    <Text style={{ fontWeight: 'bold', }}  >Marketplace</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("Sellplant") }}
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

export default Plant