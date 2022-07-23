import axios from "axios";
import React, { useEffect } from "react";
import { SafeAreaView, View, ImageBackground, FlatList } from 'react-native';
import { ScrollView} from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginpageStyle } from "./loginstyle";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useReducer } from "react";
import { solsticeStyle } from "./solsticeStyle";

var curSolarSystem;

const SystemCard = ({solarSystem, navigation}) => (
    <Card style={{margin: 5, justifyContent: 'center'}} onPress={() => {
            console.log('Clicked Solar System: ' + solarSystem.name);
            if (!solarSystem.selected)
                navigation.push('solstice', { solarSystem: solarSystem });
            else
                navigation.push('solarsystem', { solarSystem: solarSystem });
        }}>
        {/* <Card.Cover source={{uri: "https://http.cat/200"}} /> */}
        <Card.Content style={{borderColor: (solarSystem.selected ? "#4490DF" : ""), borderStyle: "solid", borderWidth: 5, borderRadius: 5}}>
            <Title>{solarSystem.name}</Title>
        </Card.Content>
    </Card>
);

const PlanetCard = ({planet, navigation}) => ( 
    <Card style={{width: "40%", margin: 5}} onPress={() => {
            console.log('Clicked Planet: '+ planet.name);
            navigation.push('planet', { planet: planet, solarSystem: curSolarSystem });
        }}>
        <Card.Content style={{borderColor: "#000", borderStyle: "solid", borderWidth: 1, borderRadius: 5}}>
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
        <ImageBackground
            source ={require('.././assets/solar_mobile.png')}
            style={{width:'100%', height: '100%'}}>
          <SafeAreaView>
            <View>
              <Title style={{marginTop:"20%", marginBottom:"10%",color:"white", textAlign:"center", fontWeight:"bold", fontSize: 30 }}>SOLSTICE</Title>
            </View>
          </SafeAreaView>

          <SafeAreaView style={solsticeStyle.container}>
            <View style={solsticeStyle.containersize}>
                <Card style={solsticeStyle.card}>
                    <Card.Content>
                        <ScrollView horizontal={true} contentContainerStyle={{flexDirection: "row", flexWrap: "wrap", alignSelf: 'center'}}>
                            {populateSolarSystems(solarSystems, navigation)}
                        </ScrollView>
                        <Card.Actions style={{justifyContent: 'center'}}>
                            <Button onPress={() => {navigation.push('solarsystem', { solarSystem: undefined })}} color="black" mode="contained">ADD SOLAR SYSTEM</Button>
                        </Card.Actions>
                        <ScrollView style={{maxHeight: 240}}>
                            <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: 'center', marginBottom: 0}}>
                                {populatePlanets(planets, navigation)}
                            </View>
                        </ScrollView>
                        <Card.Actions style={{justifyContent: 'center'}}>
                            <Button onPress={() => {navigation.push('addplanet', { solarSystem: curSolarSystem })}} color="green" mode="contained">ADD PLANET</Button>
                        </Card.Actions>
                    </Card.Content>
                </Card>
            </View>
          </SafeAreaView>
      </ImageBackground>
    );
  }
export default Solstice;