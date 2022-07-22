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
    const [type] = useState(route?.params?.planet?.type);
    const [color, setColor] = useState(route?.params?.planet?.color);
    const [moons, setMoons] = useState(route?.params?.planet?.moons || []);

    const addMoon = () => {
        let moonsClone = [...moons];
        moonsClone.push({
            name: `Moon${moons.length >= 1 ? (' ' + (moons.length + 1)) : ''}`,
            mass: 30,
            gravitationalPull: 1,
            distance: 35,
            color: "#808080",
            type: 'moon',
            _id: `moon_${moons.length + 1}:${Math.random().toString(36).substr(2, 16)}`
        });
        setMoons([...moonsClone]);
    }

    const deleteMoon = (moonIndex) => {
        let moonsClone = [...moons];
        moonsClone.splice(moonIndex, 1);
        setMoons([...moonsClone]);
    }

    const updateMoon = (moonIndex, attribute, value) => {
        let moonsClone = [...moons];
        let moonClone = moonsClone[moonIndex];
        if (attribute == 'mass' || attribute == 'distance')
            moonClone[attribute] = Number(value);
        else
            moonClone[attribute] = value;
        moonsClone[moonIndex] = moonClone;
        setMoons([...moonsClone]);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        let planet = route.params.planet;
        planet.name = name;
        planet.mass = Number(mass);
        planet.gravitationalPull = Number(gravitationalPull);
        planet.distance = Number(distance);
        planet.color = color;
        planet.moons = moons;

        const data = {
            token: await AsyncStorage.getItem('clientSession'),
            solarSystemId: route.params.solarSystem._id,
            planet: planet
        }

        try {
            // Send data to the server.
            const response = await axios.post(
              "https://solstice-project.herokuapp.com/api/update-planet",
              data
            );
    
            // Go to the main home screen
            navigation.push('solstice', {solarSystem: route.params.solarSystem});
        } catch (err) {
            console.log(err?.response?.data);
        }
    }

    async function handleDelete(e) {
        e.preventDefault();

        const data = {
            token: await AsyncStorage.getItem('clientSession'),
            solarSystemId: route.params.solarSystem._id,
            planetId: route.params.planet._id
        }

        try {
            // Send data to the server.
            const response = await axios.post(
              "https://solstice-project.herokuapp.com/api/remove-planet",
              data
            );
    
            // Go to the main home screen
            navigation.push('solstice', {solarSystem: route.params.solarSystem});
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
                        for (let i = 0; i < response.data.solarSystems.length; i++) {
                            // Detect which solar system to read the planet's data from.
                            if (response.data.solarSystems[i]._id == route.params.solarSystem._id) {
                                for (let j = 0; j < response.data.solarSystems[i].planets.length; j++) {
                                    // Find the matching planet.
                                    if (response.data.solarSystems[i].planets[j]._id == route.params.planet._id) {
                                        // Reassign the current state's values to the incoming planet attributes.
                                        setName(response.data.solarSystems[i].planets[j].name);
                                        setMass(response.data.solarSystems[i].planets[j].mass.toString());
                                        setGravitationalPull(response.data.solarSystems[i].planets[j].gravitationalPull.toString());
                                        setDistance(response.data.solarSystems[i].planets[j].distance.toString());
                                        setColor(response.data.solarSystems[i].planets[j].color);
                                        break;
                                    }
                                }
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
                    <Card.Title style={{marginLeft:"2%",marginRight:"-16%"}} title="Customize Planet"
                    right={(props)=><Button onPress={handleDelete} disabled={type == 'sun'} {...props} style={{marginRight: "20%", width:"55%"}} color="red" mode="contained">DELETE</Button>}/>
                
                    <ScrollView>
                        <Card.Content>
                            <TextInput onChangeText={setName} value={name} autoCapitalize='none' autoCorrect={false} label="Name"></TextInput>
                            <TextInput onChangeText={setMass} value={mass.toString()} autoCapitalize='none' autoCorrect={false} label="Mass"></TextInput>
                            {type == 'sun' && (<TextInput onChangeText={setGravitationalPull} value={gravitationalPull.toString()} autoCapitalize='none' autoCorrect={false} label="Gravitional Pull"></TextInput>)}
                            <TextInput onChangeText={setDistance} value={distance.toString()} autoCapitalize='none' autoCorrect={false} label="Distance"></TextInput>
                            <TextInput onChangeText={setColor} value={color} autoCapitalize='none' autoCorrect={false} label="Color"></TextInput>

                            {type == 'planet' && (<Card.Title style={{marginLeft:"2%",marginRight:"-16%"}} title="Planet's Moons"
                            right={(props)=><Button onPress={addMoon} {...props} style={{marginRight: "20%", width:"55%"}} color="green" mode="contained">+ ADD</Button>}/>)}
                            
                            {moons.map((moon, moonIndex) => (
                                <Card key={moon._id} style={{borderColor: '#808080', borderStyle: "solid", borderWidth: 2, borderRadius: 3}}>
                                    <Card.Title style={{backgroundColor: 'white'}} title={moon.name} right={(props)=><Button onPress={() => {deleteMoon(moonIndex)}} {...props} style={{marginRight: "20%", width:"80%"}} color="red" mode="contained">DELETE</Button>}/>
                                    <TextInput onChangeText={(text) => {updateMoon(moonIndex, 'name', text)}} value={moon.name} autoCapitalize='none' autoCorrect={false} label="Name"/>
                                    <TextInput onChangeText={(text) => {updateMoon(moonIndex, 'mass', text)}} value={moon.mass.toString()} autoCapitalize='none' autoCorrect={false} label="Mass"/>
                                    <TextInput onChangeText={(text) => {updateMoon(moonIndex, 'distance', text)}} value={moon.distance.toString()} autoCapitalize='none' autoCorrect={false} label="Distance"/>
                                    <TextInput onChangeText={(text) => {updateMoon(moonIndex, 'color', text)}} value={moon.color} autoCapitalize='none' autoCorrect={false} label="color"/>
                                </Card>
                            ))}

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
export default Planet;