import React, { useState } from 'react'
import axios from 'axios'
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    TextInput

} from 'react-native'

import { formSignupSchema } from './validate/validation';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Toast from 'react-native-toast-message';





function Signup(): JSX.Element {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({ username: '111', email: '1@email.com', password: '11111111' });
    const [errors, setErrors] = useState({});

    const validateForm = async () => {
        const data = formSignupSchema.safeParse(formData);
        if (data.success) {
            //  api call 
            axios.post('http://192.168.1.3:3000/api/auth/createuser', formData)
                .then(res => {
                    Toast.show({
                        type: 'success',
                        text1: res.data.message,
                    });
                    navigation.navigate("Home")
                })
                .catch(e => {
                    Toast.show({
                        type: 'error',
                        text1: e.response?.data.error,
                    });

                })


        } else {
            const error = data.error?.format();
            console.log(error);
            setErrors({
                email: error.email?._errors,
                password: error.password?._errors,
                username: error.username?._errors,
            })
        }
    };





    return (
        <View style={Style.main}>
            <ScrollView style={Style.container} contentContainerStyle={{ alignItems: 'center' }}>
                <Text style={Style.text} >Unlock the world of plant care with just a tap!</Text>

                <TextInput
                    onChangeText={(text) => setFormData({ ...formData, username: text })}
                    style={[Style.input]}
                    value={formData.username}
                    placeholder='Username'
                />
                {
                    errors.username &&
                    <Text
                        style={Style.errorText}>
                        {errors.username}
                    </Text>
                }
                <TextInput
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    style={[Style.input]}
                    value={formData.email}
                    placeholder='Email'
                />
                {
                    errors.email &&
                    <Text
                        style={Style.errorText}>
                        {errors.email}
                    </Text>
                }
                <TextInput
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                    style={[Style.input]}
                    placeholder='Password'
                    value={formData.password}
                    secureTextEntry={true}
                />
                {
                    errors.password &&
                    <Text
                        style={Style.errorText}>
                        {errors.password}
                    </Text>
                }

                <TouchableOpacity
                    onPress={
                        () => validateForm()
                    }
                    style={[Style.container, Style.btn]}>

                    <Text
                        style={{ fontWeight: 'bold' }}>
                        Create Account
                    </Text>
                </TouchableOpacity>

                <Text
                    style={[Style.text, { color: '#7bb642' }]}>
                    Already have account
                </Text>

                <TouchableOpacity

                    onPress={
                        () => navigation.navigate("Login")
                    }
                    style={[Style.container, Style.btn]}>

                    <Text style={{ fontWeight: 'bold', }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )

}

const Style = StyleSheet.create({

    main: {
        flex: 1,
        alignItems: 'center',
        fontWeight: "bold",
        borderTopColor: '#8d6042',
        borderTopWidth: 4,
        borderStyle: 'dashed',
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

    errorText: {
        color: "red",
        marginBottom: 10,
    }


})
export default Signup
