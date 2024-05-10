import React, { useState } from 'react'
import axios from 'axios'
import {
    View,
    Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    ScrollView,
    TextInput
    , Button
} from 'react-native'

function Sellplant({ navigation }): JSX.Element {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')



    async function submit() {
        axios.post('http://192.168.1.3:3000/signin', { email, password, username })
            .then(res => Alert.alert(res.data.msg))
            .catch(e => Alert.alert(e))
    }


    return (
        <View
            style={Style.main}
        >

            <ScrollView style={Style.container} contentContainerStyle={{ alignItems: 'center' }}>
                <TouchableOpacity style={Style.card} >
                    <Text style={{ color: '#909090', fontWeight: 'bold', fontSize: 15, textAlign:'center' }}>
                        Pick image of your plant
                    </Text>

                </TouchableOpacity>
                <TextInput onChangeText={(text) => setUsername(text)} style={[Style.input]}
                    placeholder='Plant name'
                />

                <TextInput onChangeText={(text) => setEmail(text)} style={[Style.input]}
                    placeholder='Plant Price'
                />

                <TextInput onChangeText={(text) => setPassword(text)} style={[Style.input]}
                    placeholder='Contact information'
                    secureTextEntry={true}
                />
                  <TextInput onChangeText={(text) => setPassword(text)} style={[Style.input]}
                    placeholder='Additional information'
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={
                    () => navigation.navigate("Home")

                } style={[Style.container, Style.btn]}>
                    <Text style={{ fontWeight: 'bold' }}  >Add to market</Text>
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
        borderRadius: 10,
        borderWidth: 3, // You can adjust the width of the border
        borderColor: '#505050', // Adjust the color of the border
        borderStyle: 'dashed',
    },




})
export default Sellplant
