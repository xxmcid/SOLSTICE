import axios from "axios";
import React from "react";
import { View } from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from "react-native";
import { Card, Paragraph, TextInput } from "react-native-paper";
import { Button } from 'react-native-paper';
import { Link } from "react-router-native";
import { loginpageStyle } from "./loginstyle";
//import { useNavigate } from "react-router-dom";
//import { AsyncStorage } from "@react-native-community/async-storage";
import { useState } from "react";
import Redirect from "react-router-native";
import { useNavigation } from "@react-navigation/native";

import SignupPage from "./SignupPage";


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let clientSession;
  const navigation = useNavigation();

  const redirectSignup = () => {
    navigation.navigate('signup');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    const login = {
        email: email,
        password: password
    };
    console.log(login);
    try {
        // Send login to the server.
        const response = await axios.post(
          "https://solstice-project.herokuapp.com/api/signin",
            login
        );
  
        // Set the state of the user
        clientSession = response.data.token;
        console.log(clientSession);
  
        // Store the user in localStorage
       await AsyncStorage.setItem('@clientSession', response.data.token);
       console.log(await AsyncStorage.getItem('@clientSession'));
        // Go to the main home screen
        console.log("signup");
        navigation.navigate('signup');
        
         // window.location.href = "./SignupPage";
    } catch (err) {
        console.log(err)
        console.log("goes into this");

    }
  }
    return (
      <ImageBackground
        source ={require('.././assets/solar_mobile.png')}
        style={{width:'100%', height: '100%'}}>
          <SafeAreaView style={loginpageStyle.container}>
          <View style={loginpageStyle.containersize}>
              <Card style={loginpageStyle.card}>
                  <Card.Title titleStyle={{textAlign:"center"}} title="Sign In"></Card.Title>
                  <Card.Content>
                      <TextInput onChangeText={setEmail} label="Email" keyboardType="email-address"></TextInput>
                      <TextInput onChangeText={setPassword} label="Password" secureTextEntry={true}></TextInput>
                      <Card.Actions>
                        <Button onPress={handleSubmit} color="grey" mode="contained">Sign in</Button>
                        <Button color="blue" uppercase={false}>Forgot your password?</Button>
                      </Card.Actions>
                      <Paragraph style={{textAlign:"center"}}>Don't have an account?</Paragraph>
                        <Button onPress={redirectSignup} color="blue" uppercase={false}>Sign up now.</Button>
                  </Card.Content>
              </Card>
            </View>
          </SafeAreaView>
      </ImageBackground>
    );
  }
export default LoginPage;