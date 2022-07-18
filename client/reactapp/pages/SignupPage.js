import React from "react";
import { View } from 'react-native';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from "react-native";
import { Card, Paragraph, TextInput } from "react-native-paper"
import { Button } from 'react-native-paper';
import { Link } from "react-router-native";
import { signuppageStyle } from "./signupstyle";
import { useNavigation } from "@react-navigation/native";


export default function LoginPage() {
  const navigation = useNavigation();
  const redirectLogin = () => {
    navigation.navigate('login');
  }
    return (
      <ImageBackground
        source ={require('.././assets/solar_mobile.png')}
        style={{width:'100%', height: '100%'}}>
          <SafeAreaView style={signuppageStyle.container}>
          <View style={signuppageStyle.containersize}>
              <Card style={signuppageStyle.card}>
                  <Card.Title titleStyle={{textAlign:"center"}} title="Sign Up"></Card.Title>
                  <Card.Content>
                      <TextInput autoCapitalize='none' autoCorrect={false} label="First Name"></TextInput>
                      <TextInput autoCapitalize='none' autoCorrect={false} label="Last Name"></TextInput>
                      <TextInput autoCapitalize='none' autoCorrect={false} autoCompleteType='email' label="Email" label="Email" keyboardType="email-address"></TextInput>
                      <TextInput autoCapitalize='none' autoCorrect={false} label="Password" secureTextEntry={true}></TextInput>
                      <Card.Actions>
                            <Button onPress={redirectLogin} style={signuppageStyle.button} color="blue" uppercase={false}>Go Back</Button>
                        <Button color="grey" mode="contained">Register</Button>
                      </Card.Actions>
                  </Card.Content>
              </Card>
            </View>
          </SafeAreaView>
      </ImageBackground>
    );
  }
