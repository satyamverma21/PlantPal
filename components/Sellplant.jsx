import React, { useState } from 'react'
import axios from 'axios'
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    TextInput
    ,
} from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import ImagePicker from "react-native-image-crop-picker";

import { sellPantSchema } from './validate/validation';

function Sellplant({ navigation }): JSX.Element {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [bgImage, setBgImage] = useState('')
    const [AdditionalInfo, setAdditionalInfo] = useState('')
    const [isGallerySelected, setGallerySelection] = useState(true);
    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({ name: '', price: '', contact: '', additional: '' });



    function isBgImageEmpty() {
        if (bgImage === '') {
            console.log('image not selected');
            setErrors(
                {
                    image: 'image not selected'
                }
            );
            return true
        }

        console.log('begug1', bgImage)
        return false

    }

    function onSubmit() {

        if (isBgImageEmpty()) {
            return
        }

        const data = sellPantSchema.safeParse(formData);
        if (data.success) { console.log('form submitted. ') }
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
            setBgImage({
                uri: img.path,
                type: img.mime,
                name: "image" + '_' + Math.floor(Math.random() * 100),
            });

            setErrors({})

        } catch (error) {
            console.log(' Error fetching images', error);
            isBgImageEmpty();
        }

    }

    async function submit() {
        axios.post('http://192.168.1.3:3000/signin', { email, password, username })
            .then(res => Alert.alert(res.data.msg))
            .catch(e => Alert.alert(e))
    }


    return (
        <View style={Style.main}>

            <ScrollView style={Style.container} contentContainerStyle={{ alignItems: 'center' }}>

                <ImageBackground style={[Style.card, Style.border]}
                    resizeMode="cover"
                    source={{ uri: bgImage.uri }}
                >
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

                <TextInput onChangeText={setUsername} style={[Style.input]}
                    placeholder='Plant name'
                />

                {
                    errors.name &&
                    <Text
                        style={Style.errorText}>
                        {errors.name}
                    </Text>
                }

                <TextInput onChangeText={setEmail} style={[Style.input]}
                    placeholder='Plant Price'
                />
                {
                    errors.price &&
                    <Text
                        style={Style.errorText}>
                        {errors.price}
                    </Text>
                }
                <TextInput onChangeText={setPassword} style={[Style.input]}
                    placeholder='Contact information'
                    secureTextEntry={true}
                />
                {
                    errors.contact &&
                    <Text
                        style={Style.errorText}>
                        {errors.contact}
                    </Text>
                }
                <TextInput onChangeText={setAdditionalInfo} style={[Style.input]}
                    placeholder='Additional information'
                    secureTextEntry={true}
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
                    // () => navigation.navigate("Home")

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
