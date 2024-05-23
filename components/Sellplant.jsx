import React, { useState } from 'react'
import axios from 'axios'
import {
    View, Text, StyleSheet, Alert, TouchableOpacity, ScrollView, ImageBackground, TextInput,
} from 'react-native'
import Toast from 'react-native-toast-message';
import CheckBox from '@react-native-community/checkbox';
import ImagePicker from "react-native-image-crop-picker"
import { sellPantSchema } from './validate/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Sellplant({ navigation }): JSX.Element {

    const [bgImage, setBgImage] = useState('')
    const [errors, setErrors] = useState({});
    const [isGallerySelected, setGallerySelection] = useState(true);
    const [formData, setFormData] = useState({ name: '1', price: '1', contact: '1', additional: '1' });
    // todo: api implementation

    function isBgImageEmpty() {
        if (bgImage === '') {
            console.log('debug: image not selected'); //debug
            setErrors(
                {
                    image: 'image not selected'
                }
            );
            return true
        }
        return false
    }

    async function onSubmit() {

        if (isBgImageEmpty()) {
            return
        }
        const Data = new FormData();
        Data.append('image', bgImage);
        Data.append('username', await AsyncStorage.getItem('username'));
        Data.append('name', formData.name);
        Data.append('price', formData.price);
        Data.append('contact', formData.contact);
        Data.append('additional', formData.additional);
        Data.append('File', bgImage.name);


        const data = sellPantSchema.safeParse(formData);
        console.log(data.success, "debug 3")
        if (data.success) {
            // console.log('form submitted. '); //debug //api
            try {
                const response = await axios.post('http://192.168.1.3:3000/uploadPlant', Data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                if (response.data.msg)
                    Toast.show({
                        type: 'info',
                        text1: response.data.msg,
                    });
                setErrors({});
            } catch (error) {
                console.log(error)

            }
        }
        else {
            const error = data.error?.format();
            setErrors({
                name: error.name?._errors,
                price: error.price?._errors,
                contact: error.contact?._errors,
                additional: error.additional?._errors,
            })
        }
    }

    async function getImage() {

        if (bgImage !== '') {
            setBgImage('');
            setErrors(
                {
                    image: 'image not selected'
                }
            );
            return
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

            const getMime = (mime)=>{
                if (mime === 'image/jpeg') return '.jpg';  else return '.png' 
            }

            setBgImage({
                uri: img.path,
                type: img.mime,
                name: "image" + '_' + Math.floor(Math.random() * 1000) + getMime(img.mime),
            });
            setErrors({})

        } catch (error) {
            console.log('debug: Error fetching images', error); //debug
            isBgImageEmpty();
        }

    }


    return (
        <View style={Style.main}>
            <ScrollView style={Style.container} contentContainerStyle={{ alignItems: 'center' }}>
                <ImageBackground style={[Style.card, Style.border]}
                    resizeMode="cover"
                    source={{ uri: bgImage.uri }}>
                    <TouchableOpacity style={Style.card} onPress={getImage} >

                        <Text style={{ fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>
                            Click image of your plant
                        </Text>
                        <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                            <CheckBox
                                value={isGallerySelected}
                                onValueChange={setGallerySelection}
                            />


                            <Text style={{ color: '#909090', fontWeight: 'bold', fontSize: 14 }}>Select image from gallery</Text>
                        </View>
                        {
                            errors.image &&
                            <Text
                                style={Style.errorText}>
                                {errors.image}
                            </Text>
                        }

                    </TouchableOpacity>

                </ImageBackground>

                <TextInput onChangeText={text => { setFormData({ ...formData, name: text }); }} style={[Style.input]}
                    placeholder='Plant name'
                    value={formData.name}
                />

                {
                    errors.name &&
                    <Text
                        style={Style.errorText}>
                        {errors.name}
                    </Text>
                }

                <TextInput onChangeText={text => { setFormData({ ...formData, price: text }) }} style={[Style.input]}
                    placeholder='Plant Price'
                    value={formData.price}
                    keyboardType='numeric'
                />

                {
                    errors.price &&
                    <Text
                        style={Style.errorText}>
                        {errors.price}
                    </Text>
                }

                <TextInput onChangeText={text => { setFormData({ ...formData, contact: text }) }} style={[Style.input]}
                    placeholder='Contact information'
                    value={formData.contact}
                    

                />

                {
                    errors.contact &&
                    <Text
                        style={Style.errorText}>
                        {errors.contact}
                    </Text>
                }

                <TextInput onChangeText={text => { setFormData({ ...formData, additional: text }) }} style={[Style.input]}
                    placeholder='Additional information'
                    value={formData.additional}


                />

                {
                    errors.additional &&
                    <Text
                        style={Style.errorText}>
                        {errors.additional}
                    </Text>
                }

                <TouchableOpacity onPress={
                    onSubmit
                    // () => navigation.navigate("Home") //navigation //move to function

                } style={[Style.container, Style.btn]}>
                    <Text style={{ fontWeight: 'bold' }}  >Add to market</Text>
                </TouchableOpacity>

                {
                    errors.password &&
                    <Text
                        style={Style.errorText}>
                        {errors.password}
                    </Text>

                }

            </ScrollView>
        </View>
    )

}

const Style = StyleSheet.create({

    main: {
        flex: 1,
        alignItems: 'center',
        fontWeight: "bold",
        // borderTopColor: '#8d6042',
        // borderTopWidth: 4,
        // borderStyle: 'dashed',
        padding: 10,
    },

    text: {
        marginVertical: 20,
        fontSize: 18,
        color: '#b07850',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    input: {
        color: "#7bb642",
        fontSize: 18,
        width: '100%',
        marginVertical: 15,
        padding: 12,
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        fontWeight: "bold",
        borderColor: "#8d6042",
        borderStyle: 'dashed'
    },
    container: {
        paddingHorizontal: 20,
        width: '95%',

    },

    btn: {
        alignItems: "center",
        backgroundColor: "#8d6042",
        padding: 10,
        borderColor: "#7bb642",
        borderWidth: 2,
        marginVertical: 20,
        borderRadius: 5,
    },
    card: {
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center',
        height: 220,
        width: '100%',
        margin: 12,

    },
    border: {
        borderRadius: 10,
        borderWidth: 3, // You can adjust the width of the border
        borderColor: '#505050', // Adjust the color of the border
        borderStyle: 'dashed',

    },
    errorText: {
        color: "red",
        marginBottom: 10,
    }



})
export default Sellplant
