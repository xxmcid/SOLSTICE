import axios from "axios";
import React from "react";
import { View } from 'react-native';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from "react-native";
import { Card, Paragraph, TextInput,Title, HelperText} from "react-native-paper"
import { Button } from 'react-native-paper';
import { signuppageStyle } from "./signupstyle";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage() {
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
        firstNameErr: false,
        firstNameErrMsg: "",
        lastNameErr: false,
        lastNameErrMsg: "",
        emailErr: false,
        emailErrMsg: "",
        passwordErr: false,
        passwordErrMsg: "",
  });

  const navigation = useNavigation();

  const redirectLogin = () => {
    navigation.navigate('login');
  }
  async function handleSubmit(e) {
    e.preventDefault();
    
    const signup = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    try {
      console.log("goes here");

        // Send login to the server.
        const response = await axios.post(
          "https://solstice-project.herokuapp.com/api/signup",
            signup
        );

        navigation.navigate('emailverify');
    } catch (err) {
      setError({
        firstNameErr: false,
        firstNameErrMsg: "",
        lastNameErr: false,
        lastNameErrMsg: "",
        emailErr: false,
        emailErrMsg: "",
        passwordErr: false,
        passwordErrMsg: "",
    })
    
    // Display error messages in red text to users.
    // TODO: figure out why this errors (what are the ? for?):
    const errMsg = err.response.data.error; // `TypeError: a.toLowerCase is not a function`
    const errMsg2 = err.response.data.error.toLowerCase(); 
    if (errMsg) {
        if (errMsg2.includes('first name')) {
            setError({
                firstNameErr: true,
                firstNameErrMsg: errMsg,
            })
        } 
        
        if (errMsg2.includes('last name')) {
            setError({
                lastNameErr: true,
                lastNameErrMsg: errMsg,
            })
        } 
        
        if (errMsg2.includes('email')) {
            setError({
                emailErr: true,
                emailErrMsg: errMsg,
            })
        } 
        
        if (errMsg2.includes('password')) {
            setError({
                passwordErr: true,
                passwordErrMsg: errMsg,
            })
        }
    }    }
};
    return (
      <ImageBackground
        source ={require('.././assets/solar_mobile.png')}
        style={{width:'100%', height: '100%'}}>
          <SafeAreaView>
            <View>
              <Title style={{marginTop:"20%",marginBottom:"20%",color:"white", textAlign:"center", fontWeight:"bold", fontSize: 30 }}>WELCOME</Title>
            </View>
          </SafeAreaView>
          <SafeAreaView style={signuppageStyle.container}>
          <View style={signuppageStyle.containersize}>
              <Card style={signuppageStyle.card}>
                  <Card.Title titleStyle={{textAlign:"center"}} title="Sign Up"></Card.Title>
                  <Card.Content>
                      <TextInput onChangeText={setfirstName} autoCapitalize='none' autoCorrect={false} label="First Name"></TextInput>
                      <HelperText visible={error.firstNameErr} style={{textAlign: "center"}} type="error">{error.firstNameErrMsg}</HelperText>
                      <TextInput onChangeText={setlastName} autoCapitalize='none' autoCorrect={false} label="Last Name"></TextInput>
                      <HelperText visible={error.lastNameErr} style={{textAlign: "center"}} type="error">{error.lastNameErrMsg}</HelperText>
                      <TextInput onChangeText={setEmail} autoCapitalize='none' autoCorrect={false} label="Email" autoCompleteType='email' keyboardType="email-address"></TextInput>
                      <HelperText visible={error.emailErr} style={{textAlign: "center"}} type="error">{error.emailErrMsg}</HelperText>
                      <TextInput onChangeText={setPassword} autoCapitalize='none' autoCorrect={false} label="Password" secureTextEntry={true}></TextInput>
                      <HelperText visible={error.passwordErr} style={{textAlign: "center"}} type="error">{error.passwordErrMsg}</HelperText>
                      <Card.Actions>
                        <Button onPress={redirectLogin} style={signuppageStyle.button} color="blue" uppercase={false}>Go Back</Button>
                        <Button onPress={handleSubmit}color="grey" mode="contained">Register</Button>
                      </Card.Actions>
                  </Card.Content>
              </Card>
            </View>
          </SafeAreaView>
      </ImageBackground>
    );
  }
