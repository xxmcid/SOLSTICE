import axios from "axios";
import React, { useEffect } from "react";
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginpageStyle } from "./loginstyle";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useReducer } from "react";

import { planetPageStyle } from "./planetpagestyle";
import { Button, Card, Paragraph, TextInput } from "react-native-paper";
import { SafeAreaView, View } from 'react-native';

function Planet(props) {
    const navigation = useNavigation();
    const route = useRoute();

    const [name, setName] = useState(route?.params?.planet?.name);
    const [mass, setMass] = useState(route?.params?.planet?.mass);
    const [gravitationalPull, setGravitationalPull] = useState(route?.params?.planet?.gravitationalPull);
    const [distance, setDistance] = useState(route?.params?.planet?.distance);
    const [color, setColor] = useState(route?.params?.planet?.color);

    async function handleSubmit(e) {
        e.preventDefault();

        let planet = route.params.planet;
        planet.name = name;
        planet.mass = Number(mass);
        planet.gravitationalPull = Number(gravitationalPull);
        planet.distance = Number(distance);
        planet.color = color;

        const data = {
            token: await AsyncStorage.getItem('clientSession'),
            solarSystemId: route.params.solarSystem._id,
            planet: planet
        }

        console.log(data);

        try {
            // Send data to the server.
            const response = await axios.post(
              "https://solstice-project.herokuapp.com/api/update-planet",
              data
            );
    
            // Go to the main home screen
            navigation.navigate('solstice', route.params.solarSystem);
        } catch (err) {
            console.log(err.response.data);
        }
    }

    return (
        <View style={{width:'100%', height: '100%'}}>
            <SafeAreaView style={planetPageStyle.container}>
                <Card style={planetPageStyle.card} >
                    <Card.Title titleStyle={{textAlign:"center"}} title="Planet Name"></Card.Title>
                    <Card.Content>
                        <TextInput onChangeText={setName} value={name} autoCapitalize='none' autoCorrect={false} label="Name"></TextInput>
                        <TextInput onChangeText={setMass} value={mass.toString()} autoCapitalize='none' autoCorrect={false} label="Mass"></TextInput>
                        <TextInput onChangeText={setGravitationalPull} value={gravitationalPull.toString()} autoCapitalize='none' autoCorrect={false} label="Gravitional Pull"></TextInput>
                        <TextInput onChangeText={setDistance} value={distance.toString()} autoCapitalize='none' autoCorrect={false} label="Distance"></TextInput>
                        <TextInput onChangeText={setColor} value={color} autoCapitalize='none' autoCorrect={false} label="Color"></TextInput>
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