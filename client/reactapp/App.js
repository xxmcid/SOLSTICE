import React from "react";
import { View, StatusBar} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import ElegantHeader from "react-native-elegant-header";


import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
const Stack = createNativeStackNavigator();

export default function App(){
    return (
        <NavigationContainer>
          <StatusBar barStyle="light-content"/>
          <Stack.Navigator screenOptions={{headerShown: false}}initialRouteName="login">
              <Stack.Screen name="login" component={LoginPage}/>
              <Stack.Screen name="signup" component={SignupPage}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
