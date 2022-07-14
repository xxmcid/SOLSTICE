import React from "react";
import { View } from 'react-native';
import { ImageBackground } from 'react-native';
import { SafeAreaView } from "react-native";
import { Card, Paragraph, TextInput } from "react-native-paper"
import { Button } from 'react-native-paper';
import { Link } from "react-router-native";
import { loginpageStyle } from "./loginstyle";

function LoginPage() {
    return (
      <ImageBackground
        source ={require('.././assets/reactAppbg.png')}
        style={{width:'100%', height: '100%'}}>
          <SafeAreaView style={loginpageStyle.container}>
          <View style={loginpageStyle.containersize}>
              <Card style={loginpageStyle.card}>
                  <Card.Title titleStyle={{textAlign:"center"}} title="Sign In"></Card.Title>
                  <Card.Content>
                      <TextInput label="Email" keyboardType="email-address"></TextInput>
                      <TextInput label="Password" secureTextEntry={true}></TextInput>
                      <Card.Actions>
                        <Button color="grey" mode="contained">Sign in</Button>
                        <Button color="blue" uppercase={false}>Forgot your password?</Button>
                      </Card.Actions>
                      <Paragraph style={{textAlign:"center"}}>Don't have an account?</Paragraph>
                      <Link to='/signup'>
                        <Button color="blue" uppercase={false}>Sign up now.</Button>
                      </Link>
                  </Card.Content>
              </Card>
            </View>
          </SafeAreaView>
      </ImageBackground>
    );
  }
export default LoginPage;