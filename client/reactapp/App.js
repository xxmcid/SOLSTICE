import React from "react";
import { Provider as PaperProvider} from "react-native-paper";
//import { Switch, Route, NativeRouter} from "react-router-native";
// import { NativeRouter, Route,Routes,Switch} from "react-router-native";
import { View} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
const Stack = createNativeStackNavigator();

export default function App(){
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="/">
              <Stack.Screen name="/" element={LoginPage}/>
              <Stack.Screen name="/signup" component={SignupPage}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
