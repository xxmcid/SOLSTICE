import React from "react";
import { View, StatusBar, SafeAreaView} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import ElegantHeader from "react-native-elegant-header";


import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Solstice from "./pages/Solstice";
import Planet from "./pages/PlanetPage";
import EmailVerification from "./pages/EmailVerification";
const Stack = createNativeStackNavigator();

export default function App(){
    return (
        <NavigationContainer>
          <StatusBar barStyle="light-content"/>
          <Stack.Navigator screenOptions={{headerShown: false, animation: 'none'}} initialRouteName="login">
              <Stack.Screen name="login" component={LoginPage}/>
              <Stack.Screen name="signup" component={SignupPage}/>
              <Stack.Screen name="solstice" component={Solstice}/>
              <Stack.Screen name="planet" component={Planet}/>
              <Stack.Screen name="emailverify" component={EmailVerification}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
