import React from 'react'
import Plant from './components/Plant'
import Singup from './components/Signup'
import Login from './components/Login'
import Navigator from './components/Navigator'
import Myplants from './components/Myplants'
import Sellplant from './components/Sellplant'
import Market from './components/Market'

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

import {
  StyleSheet,
  useColorScheme,
  ImageBackground,
  ScrollView,
  Image,
  Text,
  View
} from 'react-native'


const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (

    <ImageBackground
      source={require('./images/bg.jpg')}
      style={Style.background}
      resizeMode="repeat">
      <Image
        source={require('./images/logo.png')}
        style={Style.logo}
      />

      <NavigationContainer theme={navTheme}>


        <Stack.Navigator initialRouteName="Signup" screenOptions={
          {
            headerShown: false
          }
        }>
          <Stack.Screen name="Market" component={Market} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Plant} />
          <Stack.Screen name="Myplants" component={Myplants} />
          <Stack.Screen name="Sellplant" component={Sellplant} />
          <Stack.Screen name="Signup" component={Singup} />
          <Stack.Screen name="Navigator" component={Navigator} />

        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>

  )
}

const Style = StyleSheet.create({
  background: {
    flex: 1,
  },

  logo: {
    flex: 0,
    borderStyle: 'dashed',
    alignItems: "center",
    width: 420,
    height: 180,
    resizeMode: 'contain',
  },

})


export default App