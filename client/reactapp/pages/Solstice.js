import axios from "axios";
import React, { useEffect } from "react";
import { SafeAreaView, View } from 'react-native';
import { ScrollView } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginpageStyle } from "./loginstyle";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useReducer } from "react";

var curSolarSystem;

const SystemCard = ({solarSystem, navigation}) => (
    <Card onPress={() => {
            console.log('Clicked Solar System: ' + solarSystem.name);
            navigation.push('solstice', { solarSystem: solarSystem });
        }}>
        {/* <Card.Cover source={{uri: "https://http.cat/200"}} /> */}
        <Card.Content style={{borderColor: (solarSystem.selected ? "#4490DF" : ""), borderStyle: "solid", borderWidth: 5, borderRadius: 5}}>
        {/* <Card.Content style={{borderColor: "#414141", borderStyle: "solid", borderWidth: 2, borderRadius: 5}}> */}
            <Title>{solarSystem.name}</Title>
        </Card.Content>
    </Card>
);

const PlanetCard = ({planet, navigation}) => ( 
    <Card style={{width: "50%"}} onPress={() => {
            console.log('Clicked Planet: '+ planet.name);
            navigation.push('planet', { planet: planet, solarSystem: curSolarSystem });
        }}>
        <Card.Content>
            <Title style={{textAlign: "center"}}>{planet.name}</Title>
        </Card.Content>
        {/* <Card.Cover source={{uri: "https://http.cat/401"}} /> */}
    </Card>
);

const populateSolarSystems = (solarSystems, navigation) => {
    let newCards = [];
    for (let i = 0; i < solarSystems.length; i++) {
        newCards.push(
            <SystemCard key={solarSystems[i]._id} solarSystem={solarSystems[i]} navigation={navigation}/>
        );
    }
    return newCards;
}

const populatePlanets = (planets, navigation) => {
    let newCards = [];
    for(let i = 0; i < planets.length; i++)
    {
        newCards.push(
            <PlanetCard key={planets[i]._id} planet={planets[i]} navigation={navigation} />
        );
    }
    return newCards;
}

function Solstice() {
    const [solarSystems, setSolarSystems] = useState([]);
    const [planets, setPlanets] = useState([]);

    const navigation = useNavigation();

    const route = useRoute();
    const redirectPlanet = () => {
        navigation.push('addplanet', {solarSystem: curSolarSystem });
        
    }

    useEffect(() => {
        async function init() {
            // Read from AsyncStorage.
            const clientSession = await AsyncStorage.getItem('clientSession');

            // Validate clientSession token AND CLEAR if invalid / expired...
            if (typeof clientSession == 'string' && clientSession.length > 0) {
                // Fetch the user's solar systems.
                axios.get(`https://solstice-project.herokuapp.com/api/fetch-solar-systems/${clientSession}`)
                    .then(response => {
                        for (let i = 0; i < response.data.solarSystems.length; i++) {
                            // Detect which solar system to select from redirect.
                            response.data.solarSystems[i].selected = false;
                            if (route?.params?.solarSystem) {
                                if (response.data.solarSystems[i]._id == route.params.solarSystem._id) {
                                    response.data.solarSystems[i].selected = true;
                                    curSolarSystem = response.data.solarSystems[i];
                                    setPlanets(response.data.solarSystems[i].planets);   
                                }
                            }
                            // Select first solar system on app launch.
                            else if (i == 0) {
                                response.data.solarSystems[i].selected = true;
                                curSolarSystem = response.data.solarSystems[i];
                                setPlanets(response.data.solarSystems[i].planets);
                            }
                        }

                        setSolarSystems(response.data.solarSystems);
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
        <SafeAreaView style={{backgroundColor: "black"}}>
            <View>
              <Title style={{marginTop:"5%",marginBottom:"10%",color:"white", textAlign:"center", fontWeight:"bold", fontSize: 30 }}>SOLSTICE</Title>
            </View>
            <View style={{backgroundColor: "black", width: "100%", height: "100%"}}>
                <View style={{paddingBottom:"10%",backgroundColor: "black"}}>
                    <ScrollView horizontal={true}>
                        {populateSolarSystems(solarSystems, navigation)}
                    </ScrollView>
                </View>
                <View style={{backgroundColor: "black"}}>
                    <ScrollView contentContainerStyle={{flexDirection: "row", flexWrap: "wrap"}}>
                        {populatePlanets(planets, navigation)}
                    </ScrollView>
                </View>
                <Button onPress={redirectPlanet} style={{marginLeft: "32%",marginTop:"100%", width:"35%"}} color="green" mode="contained">Add Planet</Button>
            </View>
        </SafeAreaView>
    );
  }
export default Solstice;