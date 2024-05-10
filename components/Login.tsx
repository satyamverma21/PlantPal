import React, { useState } from 'react'
import axios from 'axios'
import { formloginSchema } from './validate/validation';
import {
    View,
    Text,
    StyleSheet,
    Button,
    Alert,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    TextInput

} from 'react-native'
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

function Login(): JSX.Element {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({ username: '111', password: '11111111' });
    const [errors, setErrors] = useState({});

    const validateForm = async () => {
        const data = formloginSchema.safeParse(formData);
        if (data.success) {
            //  api call 
            axios.post('http://192.168.1.8:3000/api/auth/login', formData)
                .then(res => {
                    Alert.alert(res.data.message)
                    navigation.navigate("Home")
                })
                .catch(e => {
                    Alert.alert(e.response?.data.error)
                })


            // navigation.navigate("Home")

        } else {
            const error = data.error?.format();
            console.log(error);
            setErrors({
                password: error.password?._errors,
                username: error.username?._errors,
            })
        }
    }


    return (<View style={Style.main}>
        <Text style={Style.text} >Join our green community and unlock the world of plant care with just a tap!</Text>
        <ScrollView style={Style.container} contentContainerStyle={{ alignItems: 'center' }}>

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
export default Login
