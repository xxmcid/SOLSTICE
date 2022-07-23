import axios from "axios";
import React, { useEffect } from "react";
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useReducer } from "react";

import { planetPageStyle } from "./planetpagestyle";
import { Button, Card, Paragraph, TextInput } from "react-native-paper";
import { SafeAreaView, View } from 'react-native';

function AddPlanet() {
    const navigation = useNavigation();
    const route = useRoute();

    const [name, setName] = useState();
    const [mass, setMass] = useState();
    const [distance, setDistance] = useState();
    const [color, setColor] = useState();

    async function handleSubmit(e){
        e.preventDefault();

        let planet = {
            name : name,
            mass : Number(mass),
            gravitationalPull : 1,
            distance : Number(distance),
            color : color,
            type : 'planet',
            moons : [],
        }
        const data = {
            token: await AsyncStorage.getItem('clientSession'),
            solarSystemId: route.params.solarSystem._id,
            planet: planet
        }

        try {
            // Send data to the server.
            const response = await axios.post(
            "https://solstice-project.herokuapp.com/api/add-planet",
            data
            );

            // Go to the main home screen
            navigation.push('solstice', {solarSystem: route.params.solarSystem});
        } catch (err) {
            console.log(err?.response?.data);
        }
    }   
    return (
        <View style={{backgroundColor: "black", width:'100%', height: '100%'}}>
            <SafeAreaView style={planetPageStyle.container}>
                <Card style={planetPageStyle.card} >
                    <Card.Title style={{marginLeft:"2%",marginRight:"-16%"}} title="Add Planet"/>              
                    <ScrollView>
                        <Card.Content>
                            <TextInput onChangeText={setName} autoCapitalize='none' autoCorrect={false} label="Name"></TextInput>
                            <TextInput onChangeText={setMass} autoCapitalize='none' autoCorrect={false} label="Mass"></TextInput>
                            <TextInput onChangeText={setDistance} autoCapitalize='none' autoCorrect={false} label="Distance"></TextInput>
                            <TextInput onChangeText={setColor} autoCapitalize='none' autoCorrect={false} label="Color"></TextInput>
                            <Card.Actions style={{justifyContent: "center"}}>
                                <Button onPress={() => {navigation.navigate('solstice')}} width="25%" color="white" mode="contained">Cancel</Button>
                                <Button onPress={handleSubmit} width="25%" style={{marginLeft:"3%"}} color="green" mode="contained">Save</Button>
                            </Card.Actions>
                        </Card.Content>
                    </ScrollView>
            
                </Card>
            </SafeAreaView>
        </View>
    );
}
export default AddPlanet;