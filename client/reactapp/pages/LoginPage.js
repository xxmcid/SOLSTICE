import axios from "axios";
import React from "react";
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from "react-native";
import { Card, Paragraph, TextInput, Title, HelperText } from "react-native-paper";
import { Button } from 'react-native-paper';
import { loginpageStyle } from "./loginstyle";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
      emailErr: false,
      emailErrMsg: "",
      passwordErr: false,
      passwordErrMsg: "",
  });

  let clientSession;
  const navigation = useNavigation();

  const redirectSignup = () => {
    navigation.navigate('signup');
  }
  
  const redirectForgotPass = () => {
    navigation.navigate('forgotpassword');
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
        navigation.navigate('solstice');
    } catch (err) {
            // Set Error Messages
            if (err && err.response && err.response.data && err.response.data.error) {
              setError({
                  emailErr: false,
                  emailErrMsg: "",
                  passwordErr: false,
                  passwordErrMsg: "",
              })

              const error = err.response.data.error;
              const error2 = err.response.data.error.toLowerCase();

              if (error2.includes('email')) {
                    setError({
                      emailErr: true,
                      emailErrMsg: error
                  });
              } 
              
              if (error2.includes('password')) {
                    setError({
                      emailErrMsg: "", // remove "email or password incorrect" message 
                      passwordErr: true,
                      passwordErrMsg: error
                  });
              }
          }    
        }
  }

    return (
      <ImageBackground
        source ={require('.././assets/MainBackgroundMobile.gif')}
        style={{width:'100%', height: '100%'}}>
          <SafeAreaView>
            <View>
              <Title style={{marginTop:"20%",marginBottom:"15%",color:"white", textAlign:"center", fontWeight:"bold", fontSize: 30 }}>SOLSTICE</Title>
            </View>
          </SafeAreaView>
          <SafeAreaView style={loginpageStyle.container}>
          <View style={loginpageStyle.containersize}>
              <Card style={loginpageStyle.card}>
                  <Card.Title titleStyle={{textAlign:"center"}} title="Sign In"></Card.Title>
                  <Card.Content>
                      <TextInput onChangeText={setEmail} placeholderTextColor='red' autoCapitalize='none' autoCorrect={false} autoCompleteType='email' label="Email" keyboardType="email-address"></TextInput>
                      <HelperText visible={error.emailErr} style={{textAlign: "center"}} type="error">{error.emailErrMsg}</HelperText>
                      <TextInput onChangeText={setPassword} autoCapitalize='none' autoCorrect={false} label="Password" secureTextEntry={true}></TextInput>
                      <HelperText visible={error.passwordErr} style= {{textAlign: "center"}} type="error">{error.passwordErrMsg}</HelperText>
                      <Card.Actions style={{justifyContent: "center"}}>
                        <Button onPress={handleSubmit} uppercase={false} color="grey" mode="contained">Sign in</Button>
                        <Button onPress={redirectForgotPass} color="blue" uppercase={false}>Forgot your password?</Button> 
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