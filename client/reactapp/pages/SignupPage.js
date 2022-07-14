import React from "react";
import { View } from 'react-native';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from "react-native";
import { Card, Paragraph, TextInput } from "react-native-paper"
import { Button } from 'react-native-paper';
import { Link } from "react-router-native";
import { signuppageStyle } from "./signupstyle";

export default function LoginPage() {
    return (
      <ImageBackground
        source ={require('.././assets/reactAppbg.png')}
        style={{width:'100%', height: '100%'}}>
          <SafeAreaView style={signuppageStyle.container}>
          <View style={signuppageStyle.containersize}>
              <Card style={signuppageStyle.card}>
                  <Card.Title titleStyle={{textAlign:"center"}} title="Sign Up"></Card.Title>
                  <Card.Content>
                      <TextInput label="First Name"></TextInput>
                      <TextInput label="Last Name"></TextInput>
                      <TextInput label="Email" keyboardType="email-address"></TextInput>
                      <TextInput label="Password" secureTextEntry={true}></TextInput>
                      <Card.Actions>
                        <Link to='/'>
                            <Button style={signuppageStyle.button} color="blue" uppercase={false}>Go Back</Button>
                        </Link>
                        <Button color="grey" mode="contained">Register</Button>
                      </Card.Actions>
                  </Card.Content>
              </Card>
            </View>
          </SafeAreaView>
      </ImageBackground>
    );
  }
