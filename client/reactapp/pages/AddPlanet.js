import axios from "axios";
import React, { useEffect } from "react";
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useReducer } from "react";

import { planetPageStyle } from "./planetpagestyle";
import { Button, Card, Paragraph, TextInput, List } from "react-native-paper";
import { SafeAreaView, View } from 'react-native';

function AddPlanet() {
    const navigation = useNavigation();
    const route = useRoute();

    const [name, setName] = useState("Planet");
    const [mass, setMass] = useState(35);
    const [distance, setDistance] = useState(200);
    const [color, setColor] = useState("#ffffff");
    const [texturePreset, setTexturePreset] = useState('earth');
    
    const [moons, setMoons] = useState([]);

    const addMoon = () => {
        let moonsClone = [...moons];
        moonsClone.push({
            name: `Moon${moons.length >= 1 ? (' ' + (moons.length + 1)) : ''}`,
            mass: 15,
            gravitationalPull: 1,
            distance: 0,
            color: "#EFEFEF",
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

        let planet = {
            name: name,
            mass: Number(mass),
            gravitationalPull: 1,
            distance: Number(distance),
            color: color,
            type: 'planet',
            texturePreset: texturePreset,
            moons: moons
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
                            <TextInput onChangeText={setName} value={name} autoCapitalize='none' autoCorrect={false} label="Name"></TextInput>
                            <TextInput onChangeText={setMass} value={mass.toString()} autoCapitalize='none' autoCorrect={false} label="Mass"></TextInput>
                            <TextInput onChangeText={setDistance} value={distance.toString()} autoCapitalize='none' autoCorrect={false} label="Distance"></TextInput>
                            <TextInput onChangeText={setColor} value={color} autoCapitalize='none' autoCorrect={false} label="Color"></TextInput>

                            <List.Accordion style={{backgroundColor: "#cfcfcf"}} title="Texture Preset" left={props => <List.Icon {...props} icon="texture-box"/>}>
                                <List.Item style={{backgroundColor: texturePreset == 'sun' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('sun')}} title="Sun" left={props => <List.Icon {...props} color="gold" icon="white-balance-sunny"/>}/>
                                <List.Item style={{backgroundColor: texturePreset == 'earth' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('earth')}} title="Earth" left={props => <List.Icon {...props} color="green" icon="circle"/>}/>
                                <List.Item style={{backgroundColor: texturePreset == 'moon' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('moon')}} title="Moon"  left={props => <List.Icon {...props} color="gray" icon="moon-waning-crescent"/>}/>
                                <List.Item style={{backgroundColor: texturePreset == 'dry' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('dry')}} title="Dry"  left={props => <List.Icon {...props} color="#C2B280" icon="circle"/>}/>
                                <List.Item style={{backgroundColor: texturePreset == 'gas2' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('gas2')}} title="Gas"  left={props => <List.Icon {...props} color="#A45729" icon="circle-outline"/>}/>
                                <List.Item style={{backgroundColor: texturePreset == 'gas1' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('gas1')}} title="Gas (with rings)"  left={props => <List.Icon {...props} color="#A45729" icon="circle-off-outline"/>}/>
                                <List.Item style={{backgroundColor: texturePreset == 'ice' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('ice')}} title="Ice"  left={props => <List.Icon {...props} color="skyblue" icon="square-rounded"/>}/>
                                <List.Item style={{backgroundColor: texturePreset == 'water' ? "#dfdfdf" : "#efefef"}} onPress={() => {setTexturePreset('water')}} title="Water"  left={props => <List.Icon {...props} color="blue" icon="wave"/>}/>
                            </List.Accordion>

                            <Card.Title style={{marginLeft:"2%",marginRight:"-16%"}} title="Planet's Moons"
                            right={(props)=><Button onPress={addMoon} {...props} style={{marginRight: "20%", width:"55%"}} color="green" mode="contained">+ ADD</Button>}/>
                            
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
                                <Button onPress={() => {navigation.push('solstice', {solarSystem: route.params.solarSystem})}} width="25%" color="white" mode="contained">Cancel</Button>
                                <Button onPress={handleSubmit} width="25%" style={{marginLeft:"3%"}} color="green" mode="contained">Add</Button>
                            </Card.Actions>
                        </Card.Content>
                    </ScrollView>
            
                </Card>
            </SafeAreaView>
        </View>
    );
}
export default AddPlanet;