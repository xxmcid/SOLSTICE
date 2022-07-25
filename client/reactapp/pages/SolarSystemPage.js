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

    async function handleSubmit(e) {
        e.preventDefault();

        let data = {
            token: await AsyncStorage.getItem('clientSession'),
            name: name
        }

        if (route.params.solarSystem)
            data.solarSystemId = route.params.solarSystem._id
        else
            data.planets = [
                {
                    "name": "Sun",
                    "mass": 100,
                    "gravitationalPull": 1,
                    "distance": 0,
                    "color": "#FFEA00",
                    "type": "sun",
                    "moons": []
                },
                {
                    "name": "Planet",
                    "mass": 25,
                    "gravitationalPull": 1,
                    "distance": 150,
                    "color": "#7FE54C",
                    "type": "planet",
                    "moons": [
                        {
                            "name": "Moon",
                            "mass": 15,
                            "gravitationalPull": 1,
                            "distance": 0,
                            "color": "#EFEFEF",
                            "type": "moon",
                            "_id": "moon_1:1234567891234567"
                        }
                    ]
                }
            ]

        try {
            // Send data to the server.
            const response = await axios.post(
              `https://solstice-project.herokuapp.com/api/${route.params.solarSystem ? 'update' : 'add'}-solar-system`,
              data
            );
    
            // Go to the main home screen
            navigation.push('solstice', {solarSystem: route.params.solarSystem || response.data.solarSystem});
        } catch (err) {
            console.log(err?.response?.data);
        }
    }

    async function handleDelete(e) {
        e.preventDefault();

        const data = {
            token: await AsyncStorage.getItem('clientSession'),
            solarSystemId: route.params.solarSystem._id
        }

        try {
            // Send data to the server.
            const response = await axios.post(
              "https://solstice-project.herokuapp.com/api/remove-solar-system",
              data
            );
    
            // Go to the main home screen
            navigation.push('solstice', {solarSystem: undefined});
        } catch (err) {
            console.log(err?.response?.data);
        }
    }

    useEffect(() => {
        async function init() {
            // Read from AsyncStorage.
            const clientSession = await AsyncStorage.getItem('clientSession');

            // We re check for an updated response from the API in case we changed a planet's attributes outside of the app.
            if (typeof clientSession == 'string' && clientSession.length > 0) {
                // Fetch the user's solar systems.
                axios.get(`https://solstice-project.herokuapp.com/api/fetch-solar-systems/${clientSession}`)
                    .then(response => {

                        if (!route.params.solarSystem) {
                            setName("Solar System");
                            return;
                        }

                        for (let i = 0; i < response.data.solarSystems.length; i++) {
                            // Detect which solar system to read from.
                            if (response.data.solarSystems[i]._id == route.params.solarSystem._id) {
                                setName(response.data.solarSystems[i].name);
                                break;
                            }
                        }
                    })
                    .catch(async err => {
                        // Logout & redirect to Sign In
                        await AsyncStorage.clear();
                        navigation.navigate('login');
                    });
            } else if (!clientSession) {
                // Redirect to Sign In
                navigation.navigate('login');
            }
        }

        init();
    }, []);

    return (
        <View style={{backgroundColor: "black", width:'100%', height: '100%'}}>
            <SafeAreaView style={planetPageStyle.container}>
                <Card style={planetPageStyle.card} >
                    <Card.Title style={{marginLeft:"2%",marginRight:"-16%"}} title={route.params.solarSystem ? "Customize Solar System" : "Add Solar System"}
                    right={(props)=><Button onPress={handleDelete} disabled={!route.params.solarSystem} {...props} style={{marginRight: "20%", width:"55%"}} color="red" mode="contained">DELETE</Button>}/>
                
                    <ScrollView>
                        <Card.Content>
                            <TextInput activeOutlineColor="blue" outlineColor="black" mode="outlined" onChangeText={setName} value={name} autoCapitalize='none' autoCorrect={false} label="Name"></TextInput>

                            <Card.Actions style={{justifyContent: "center"}}>
                                <Button onPress={() => {navigation.push('solstice', {solarSystem: route.params.solarSystem})}} width="25%" color="white" mode="contained">Cancel</Button>
                                {route.params.solarSystem && (<Button onPress={handleSubmit} width="25%" style={{marginLeft:"3%"}} color="green" mode="contained">Save</Button>)}
                                {!route.params.solarSystem && (<Button onPress={handleSubmit} width="25%" style={{marginLeft:"3%"}} color="green" mode="contained">Add</Button>)}
                            </Card.Actions>
                            
                        </Card.Content>
                    </ScrollView>
            
                </Card>
            </SafeAreaView>
        </View>
    );
  }
export default Planet;