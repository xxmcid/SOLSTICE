import React from "react";
import { View, StatusBar, SafeAreaView} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack"

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Solstice from "./pages/Solstice";
import Planet from "./pages/PlanetPage";
import SolarSystem from "./pages/SolarSystemPage";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";
import ForgotPassSuccess from "./pages/ForgotPassSuccess";
import AddPlanet from "./pages/AddPlanet";
import HomePage from "./pages/HomePage";

const Stack = createNativeStackNavigator();

export default function App(){
    return (
        <NavigationContainer>
          <StatusBar barStyle="light-content"/>
          <Stack.Navigator screenOptions={{headerShown: false, animation: 'none'}} initialRouteName="homepage">
              <Stack.Screen name="login" component={LoginPage}/>
              <Stack.Screen name="signup" component={SignupPage}/>
              <Stack.Screen name="solstice" component={Solstice}/>
              <Stack.Screen name="planet" component={Planet}/>
              <Stack.Screen name="solarsystem" component={SolarSystem}/>
              <Stack.Screen name="emailverify" component={EmailVerification}/>
              <Stack.Screen name="forgotpassword" component={ForgotPassword}/>
              <Stack.Screen name="forgotsuccess" component={ForgotPassSuccess}/>
              <Stack.Screen name="addplanet" component={AddPlanet}/>
              <Stack.Screen name="homepage" component={HomePage}/>
          </Stack.Navigator>
        </NavigationContainer>
    );
  }
