import axios from "axios";
import React, { useEffect } from "react";
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import { Card, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginpageStyle } from "./loginstyle";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";


const SystemCard = ({systemName}) => (
    <Card onPress={() => {console.log(systemName);}}>
        {/* <Card.Cover source={{uri: "https://http.cat/200"}} /> */}
        <Card.Content>
            <Title>{systemName}</Title>
        </Card.Content>
    </Card>
);

const PlanetCard = ({planetName}) => ( 
    <Card style={{width: "50%"}}>
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
            <SystemCard key={solarSystems[i]._id} systemName={solarSystems[i].name}/>
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
                                setSolarSystems(response.data.solarSystems);

                                for (let i = 0; i < solarSystems.length; i++) {
                                    // TEMP: (TODO: add a 'selected' attribute to solar systems)
                                    setPlanets
                                    if (i == 0)
                                        setPlanets(response.data.solarSystems[i].planets);
                                }
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