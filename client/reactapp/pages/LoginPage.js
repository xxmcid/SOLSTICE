import axios from "axios";
import React from "react";
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from "react-native";
import { Card, Paragraph, TextInput } from "react-native-paper";
import { Button } from 'react-native-paper';
import { Link } from "react-router-native";
import { loginpageStyle } from "./loginstyle";
import { useState } from "react";
import Redirect from "react-router-native";
import { useNavigation } from "@react-navigation/native";

import SignupPage from "./SignupPage";


function LoginPage() {
  const [email, setEmail] = useState('michaelvuolo1@gmail.com');
  const [password, setPassword] = useState('Test1234*');
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
    try {
        // Send login to the server.
        const response = await axios.post(
          "https://solstice-project.herokuapp.com/api/signin",
            login
        );
  
        // Set the state of the user
        clientSession = response.data.token;
        console.log('Client Session: ' + clientSession);
  
        // Store the user in AsyncStore (localStorage equivalent)
       await AsyncStorage.setItem('clientSession', response.data.token);

        // Go to the main home screen
        navigation.navigate('planet');
    } catch (err) {
        console.log(err)

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
                      <TextInput onChangeText={setEmail} autoCapitalize='none' autoCorrect={false} autoCompleteType='email' label="Email" keyboardType="email-address"></TextInput>
                      <TextInput onChangeText={setPassword} autoCapitalize='none' autoCorrect={false} label="Password" secureTextEntry={true}></TextInput>
                      <Card.Actions style={{justifyContent: "center"}}>
                        <Button onPress={handleSubmit} color="grey" mode="contained">Sign in</Button>
                        {/* <Button color="blue" uppercase={false}>Forgot your password?</Button> */}
                      </Card.Actions>
                      {/* <Paragraph style={{textAlign:"center"}}>Don't have an account?</Paragraph>
                        <Button onPress={redirectSignup} color="blue" uppercase={false}>Sign up now.</Button> */}
                  </Card.Content>
              </Card>
            </View>
          </SafeAreaView>
      </ImageBackground>
    );
  }
export default LoginPage;