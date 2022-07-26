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
  const [confirmPass, setConfirmPass] = useState('');

  const [error, setError] = useState({
        firstNameErr: false,
        firstNameErrMsg: "",
        lastNameErr: false,
        lastNameErrMsg: "",
        emailErr: false,
        emailErrMsg: "",
        passwordErr: false,
        passwordErrMsg: "",
        confirmPasswordErrorMsg: false,
        confirmPasswordError: "",
  });

  const navigation = useNavigation();

  const redirectLogin = () => {
    navigation.navigate('login');
  }
  async function handleSubmit(e) {
    e.preventDefault();
    
    const signup = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password: password
    };

    if (password !== confirmPass){
      setError({
        firstNameErr: false,
        firstNameErrMsg: "",
        lastNameErr: false,
        lastNameErrMsg: "",
        emailErr: false,
        emailErrMsg: "",
        passwordErr: false,
        passwordErrMsg: "",
        confirmPasswordErrorMsg: "The passwords do not match!",
        confirmPasswordError: true,
    })
      return;
    }
            

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
        confirmPasswordErrorMsg: false,
        confirmPasswordError: "",
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
        source ={require('.././assets/MainBackgroundMobile.png')}
        style={{width:'100%', height: '100%'}}>
          <SafeAreaView>
            <View>
              <Title style={{marginTop:"15%",marginBottom:"10%",color:"white", textAlign:"center", fontWeight:"bold", fontSize: 30 }}>SOLSTICE</Title>
            </View>
          </SafeAreaView>
          <SafeAreaView style={signuppageStyle.container}>
          <View style={signuppageStyle.containersize}>
              <Card style={signuppageStyle.card}>
                  <Card.Title titleStyle={{textAlign:"center"}} title="Sign Up"></Card.Title>
                  <Card.Content>
                      <TextInput activeOutlineColor="blue" outlineColor="black" mode="outlined" onChangeText={setfirstName} autoCapitalize='none' autoCorrect={false} label="First Name"></TextInput>
                      <HelperText visible={error.firstNameErr} style={{textAlign: "center"}} type="error">{error.firstNameErrMsg}</HelperText>
                      <TextInput activeOutlineColor="blue" outlineColor="black" mode="outlined" onChangeText={setlastName} autoCapitalize='none' autoCorrect={false} label="Last Name"></TextInput>
                      <HelperText visible={error.lastNameErr} style={{textAlign: "center"}} type="error">{error.lastNameErrMsg}</HelperText>
                      <TextInput activeOutlineColor="blue" outlineColor="black" mode="outlined" onChangeText={setEmail} autoCapitalize='none' autoCorrect={false} label="Email" autoCompleteType='email' keyboardType="email-address"></TextInput>
                      <HelperText visible={error.emailErr} style={{textAlign: "center"}} type="error">{error.emailErrMsg}</HelperText>
                      <TextInput activeOutlineColor="blue" outlineColor="black" mode="outlined" onChangeText={setPassword} autoCapitalize='none' autoCorrect={false} label="Password" secureTextEntry={true}></TextInput>
                      <HelperText visible={error.passwordErr} style={{textAlign: "center"}} type="error">{error.passwordErrMsg}</HelperText>                     
                      <TextInput activeOutlineColor="blue" outlineColor="black" mode="outlined" onChangeText={setConfirmPass} autoCapitalize='none' autoCorrect={false} label="Confirm Password" secureTextEntry={true}></TextInput>
                      <HelperText visible={error.confirmPasswordError} style={{textAlign: "center"}} type="error">{error.confirmPasswordErrorMsg}</HelperText>
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
