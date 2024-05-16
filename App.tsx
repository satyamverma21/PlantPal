import React from 'react'
import Plant from './components/Plant'
import Singup from './components/Signup'
import Login from './components/Login'
import Navigator from './components/Navigator'
import Myplants from './components/Myplants'
import Sellplant from './components/Sellplant'
import Market from './components/Market'
import Dicease from './components/Dicease'
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';


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
import PlantId from './components/Plantid'


const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '600'
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: 'red' }}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),


};


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
        <Toast config={toastConfig}/>
      <NavigationContainer theme={navTheme}>


        <Stack.Navigator initialRouteName="Home" screenOptions={
          {
            headerShown: false
          }
        }>
          <Stack.Screen name="Market" component={Market} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Plant} />
          <Stack.Screen name="PlantId" component={PlantId} />
          <Stack.Screen name="Dicease" component={Dicease} />
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