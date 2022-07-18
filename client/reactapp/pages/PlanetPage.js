import axios from "axios";
import React, { useEffect } from "react";
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginpageStyle } from "./loginstyle";
import { useNavigation } from "@react-navigation/native";
import { useState, useReducer } from "react";
import { SidePanel } from '../components/SidePanel';

import { planetPageStyle } from "./planetpagestyle";
import { Button, Card, Paragraph, TextInput } from "react-native-paper";
import { SafeAreaView, View } from 'react-native';



function Planet() {
    const [name, setName] = useState('');
    const [mass, setMass] = useState('');
    const [gravitionalPull, setGravitionalPull] = useState(0);
    const [distance, setDistance] = useState(0);
    const [color, setColor] = useState('');

    const navigation = useNavigation();

    async function handleSubmit(e) {
        e.preventDefault();
        
        // const login = {
        //     email: email,
        //     password: password
        // }; 

        // try {
        //     // Send login to the server.
        //     const response = await axios.post(
        //       "https://solstice-project.herokuapp.com/api/signin",
        //         login
        //     );
      
        //     // Set the state of the user
        //     clientSession = response.data.token;
        //     console.log('Client Session: ' + clientSession);
      
        //     // Store the user in AsyncStore (localStorage equivalent)
        //    await AsyncStorage.setItem('clientSession', response.data.token);
    
        //     // Go to the main home screen
        //     navigation.navigate('planet');
        // } catch (err) {
        //     console.log(err)
    
        // }
    }

    return (
        <View style={{width:'100%', height: '100%'}}>
            <SafeAreaView style={planetPageStyle.container}>
                <Card style={planetPageStyle.card} >
                    <Card.Title titleStyle={{textAlign:"center"}} title="Planet Name"></Card.Title>
                    <Card.Content>
                        <TextInput onChangeText={setName} autoCapitalize='none' autoCorrect={false} label="Name"></TextInput>
                        <TextInput onChangeText={setMass} autoCapitalize='none' autoCorrect={false} label="Mass"></TextInput>
                        <TextInput onChangeText={setGravitionalPull} autoCapitalize='none' autoCorrect={false} label="Gravitional Pull"></TextInput>
                        <TextInput onChangeText={setDistance} autoCapitalize='none' autoCorrect={false} label="Distance"></TextInput>
                        <TextInput onChangeText={setColor} autoCapitalize='none' autoCorrect={false} label="Color"></TextInput>
                        {/* <TextInput autoCapitalize='none' autoCorrect={false} label="Moons"></TextInput> */}
                        <Card.Actions style={{justifyContent: "center"}}>
                            <Button onPress={handleSubmit} color="grey" mode="contained">Save</Button>
                            {/* <Button color="blue" uppercase={false}>Forgot your password?</Button> */}
                        </Card.Actions>
                        {/* <Paragraph style={{textAlign:"center"}}>Don't have an account?</Paragraph>
                            <Button onPress={redirectSignup} color="blue" uppercase={false}>Sign up now.</Button> */}
                    </Card.Content>
                </Card>
            </SafeAreaView>
        </View>
    );
  }
export default Planet;