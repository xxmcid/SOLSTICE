import axios from "axios";
import React, { useEffect } from "react";
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import { Card, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginpageStyle } from "./loginstyle";
import { useNavigation } from "@react-navigation/native";
import { useState, useReducer } from "react";


// function solarSystemClicked(id) {
//     console
// }

const SystemCard = ({systemName, selected}) => (
    <Card onPress={() => {
            console.log('Clicked Solar System: '+ systemName);
            // console.log(solarSystems);
        }}>
        {/* <Card.Cover source={{uri: "https://http.cat/200"}} /> */}
        <Card.Content style={{borderColor: (selected ? "#4490DF" : "#414141"), borderStyle: "solid", borderWidth: 2, borderRadius: 5}}>
        {/* <Card.Content style={{borderColor: "#414141", borderStyle: "solid", borderWidth: 2, borderRadius: 5}}> */}
            <Title>{systemName}</Title>
        </Card.Content>
    </Card>
);

const PlanetCard = ({planetName}) => ( 
    <Card style={{width: "50%"}} onPress={() => {
            console.log('Clicked Planet: '+ planetName);
            // console.log(solarSystems);
        }}>
        <Card.Content>
            <Title style={{textAlign: "center"}}>{planetName}</Title>
        </Card.Content>
        {/* <Card.Cover source={{uri: "https://http.cat/401"}} /> */}
    </Card>
);

const populateSolarSystems = (solarSystems) => {
    let newCards = [];
    for (let i = 0; i < solarSystems.length; i++) {
        newCards.push(
            <SystemCard key={solarSystems[i]._id} systemName={solarSystems[i].name} selected={solarSystems[i].selected}/>
        );
    }
    return newCards;
}

const populatePlanets = (planets) => {
    let newCards = [];
    for(let i = 0; i < planets.length; i++)
    {
        newCards.push(
            <PlanetCard key={planets[i]._id} planetName={planets[i].name} />
        );
    }
    return newCards;
}

function Solstice() {
    const [solarSystems, setSolarSystems] = useState([]);
    const [planets, setPlanets] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        console.log('useEffect() called');
        AsyncStorage
        .getItem('clientSession')
        .then(clientSession => {
            // Validate clientSession token AND CLEAR if invalid / expired...
            if (typeof clientSession == 'string' && clientSession.length > 0) {
                axios.get(`https://solstice-project.herokuapp.com/api/validate-session/${clientSession}`)
                    .then(response => {
                        // Fetch the user's solar systems.
                        axios.get(`https://solstice-project.herokuapp.com/api/fetch-solar-systems/${clientSession}`)
                            .then(response => {
                                // Log user's solar systems to console.
                                for (let i = 0; i < response.data.solarSystems.length; i++) {
                                    // TEMP: (TODO: add a 'selected' attribute to solar systems)
                                    if (i == 0) {
                                        response.data.solarSystems[i].selected = true;
                                        setPlanets(response.data.solarSystems[i].planets);
                                    } else {
                                        response.data.solarSystems[i].selected = false;
                                    }
                                }

                                setSolarSystems(response.data.solarSystems);
                            })
                            .catch(err => {
                                console.log(err);
                                console.log('COULD NOT FIND ANY SOLAR SYSTEMS FOR THE USER!!!');
                            });
                    })
                    .catch(err => {
                        // Logout
                        AsyncStorage
                        .clear()
                        .then(() => {
                            // Redirect to Sign In
                            navigation.navigate('login');
                        })
                        .catch(err => {
                            console.log(err);
                        });
                    });
            } else if (!clientSession) {
                // Redirect to Sign In
                navigation.navigate('solstice');
            }
        })
        .catch(err => {
            console.log(err);
            // Logout
            AsyncStorage
                .clear()
                .then(() => {
                    // Redirect to Sign In
                    navigation.navigate('login');
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }, []);

    return (
        <View>
            <View>
                <ScrollView horizontal={true}>
                    {populateSolarSystems(solarSystems)}
                </ScrollView>
            </View>
            <View>
                <ScrollView contentContainerStyle={{flexDirection: "row", flexWrap: "wrap"}}>
                    {populatePlanets(planets)}
                </ScrollView>
            </View>
        </View>
    );
  }
export default Solstice;