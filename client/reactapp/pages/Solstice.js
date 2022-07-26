import axios from "axios";
import React, { useEffect } from "react";
import { SafeAreaView, View, ImageBackground, FlatList } from 'react-native';
import { ScrollView,Text} from 'react-native';
import { Button, Card, Title, Modal, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginpageStyle } from "./loginstyle";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useReducer } from "react";
import { solsticeStyle } from "./solsticeStyle";
import Ionicons from '@expo/vector-icons/Ionicons'

var curSolarSystem;
var bruteForceSolarSystems = [];
const BACKGROUND_REFRESH_DELAY = 1000;
var backgroundRefreshInterval;

const SystemCard = ({solarSystem, navigation}) => (
    <Card style={{margin: 5, justifyContent: 'center'}} onPress={() => {
            console.log('Clicked Solar System: ' + solarSystem.name);
            if (!solarSystem.selected) {
                if (backgroundRefreshInterval) clearInterval(backgroundRefreshInterval);
                navigation.push('solstice', { solarSystem: solarSystem });
            }
            else {
                if (backgroundRefreshInterval) clearInterval(backgroundRefreshInterval);
                navigation.push('solarsystem', { solarSystem: solarSystem });
            }
        }}>
        {/* <Card.Cover source={{uri: "https://http.cat/200"}} /> */}
        <Card.Content style={{borderColor: (solarSystem.selected ? "#4490DF" : "#808080"), borderStyle: "solid", borderWidth: 3, borderRadius: 5}}>
            <Title>{solarSystem.name}</Title>
        </Card.Content>
    </Card>
);

const PlanetCard = ({planet, navigation}) => ( 
    <Card style={{width: "40%", margin: 5}} onPress={() => {
            console.log('Clicked Planet: '+ planet.name);
            if (backgroundRefreshInterval) clearInterval(backgroundRefreshInterval);
            navigation.push('planet', { planet: planet, solarSystem: curSolarSystem });
        }}>
        <Card.Content style={{borderColor: "#808080", borderStyle: "solid", borderWidth: 1, borderRadius: 5}}>
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
    const [showLogoutModal, setLogoutModalVisibility] = useState(false);

    const navigation = useNavigation();
    const route = useRoute();

    const doLogout = async () => {
        if (backgroundRefreshInterval) clearInterval(backgroundRefreshInterval);
        await AsyncStorage.clear();
        setLogoutModalVisibility(false);
        navigation.push('login');
    }

    const beginBackgroundSolarSystemRefresh = async () => {
        backgroundRefreshInterval = setInterval(async () => {
            console.log('Checking for Mismatched Solar Systems...');
            try { // Fetch the user's solar systems.
                const response = await axios.get(`https://solstice-project.herokuapp.com/api/fetch-solar-systems/${await AsyncStorage.getItem('clientSession')}`)

                let solarSystems_response = response.data.solarSystems;
                if (!solarSystems_response) {
                    console.log('> Error fetching solar systems.'); return;
                }

                // Match each solar system's 'selected' status
                solarSystems_response.forEach((solarSystem, solarSystemIndex) => {
                    solarSystems_response[solarSystemIndex].selected = bruteForceSolarSystems[solarSystemIndex].selected;
                });
                
                // Check for mismatching data
                if (JSON.stringify(solarSystems_response) == JSON.stringify(bruteForceSolarSystems))
                    return;
                else
                    console.log('> Found Mismatched Solar Systems! Re-rendering...');

                bruteForceSolarSystems = [...solarSystems_response];
    
                // Set our planets JSON to our state
                // P5 should see this change in sketch.js and update accordingly.
                setSolarSystems(solarSystems_response);
                solarSystems_response.forEach((solarSystem) => {
                    if (solarSystem.selected) {
                        setPlanets(solarSystem.planets); return;
                    }
                });
            } catch(err) { if (err?.response?.data) { console.log(err?.response?.data) } else console.log(err) };
        }, BACKGROUND_REFRESH_DELAY);
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
                        // console.log('inital solar systems: ');
                        // console.log(response.data.solarSystems.length);
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
                        bruteForceSolarSystems = [...response.data.solarSystems];
                        // console.log('response data solarSystems length: ' + response.data.solarSystems.length);
                        // console.log('state\'s solar system length: ' + solarSystems.length);
                        // shouldBackgroundRefresh = true;
                        beginBackgroundSolarSystemRefresh();
                    })
                    .catch(async err => {
                        // Logout & redirect to Sign In
                        if (backgroundRefreshInterval) clearInterval(backgroundRefreshInterval);
                        await AsyncStorage.clear();
                        navigation.navigate('login');
                    });
            } else if (!clientSession) {
                // Redirect to Sign In
                if (backgroundRefreshInterval) clearInterval(backgroundRefreshInterval);
                navigation.navigate('login');
            }
        }

        init();
    }, []);

    return (
        <ImageBackground
            source ={require('.././assets/MainBackgroundMobile.png')}
            style={{width:'100%', height: '100%'}}>
          <SafeAreaView>
            <View>
                <Title style={{marginTop:"20%", color:"white", textAlign:"center", fontWeight:"bold", fontSize: 30 }}>SOLSTICE</Title>
                
                <Ionicons onPress={() => {setLogoutModalVisibility(true)}} style={{marginLeft: "82%", marginTop: -38, marginBottom: 45}} name="ios-settings-sharp" size={32} color="white"/>
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
                            <Button onPress={() => {if (backgroundRefreshInterval) clearInterval(backgroundRefreshInterval); navigation.push('solarsystem', { solarSystem: undefined })}} color="black" mode="contained">ADD SOLAR SYSTEM</Button>
                        </Card.Actions>
                        <ScrollView style={{maxHeight: 240}}>
                            <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: 'center', marginBottom: 0}}>
                                {populatePlanets(planets, navigation)}
                            </View>
                        </ScrollView>
                        <Card.Actions style={{justifyContent: 'center'}}>
                            <Button onPress={() => {if (backgroundRefreshInterval) clearInterval(backgroundRefreshInterval); navigation.push('addplanet', { solarSystem: curSolarSystem })}} color="green" mode="contained">ADD PLANET</Button>
                        </Card.Actions>
                    </Card.Content>
                </Card>
            </View>
          </SafeAreaView>

          {showLogoutModal && (<SafeAreaView style={{width: "100%", height: "100%", position: "absolute"}}>
            <Modal visible={showLogoutModal} onDismiss={() => {setLogoutModalVisibility(false)}}>
                <View style={solsticeStyle.modalContainer}>
                    <Card style={solsticeStyle.modalCard}>
                        <Card.Content>
                            <Card.Title titleStyle={{textAlign:"center"}} title="Log out?"></Card.Title>
                            <Paragraph style={{textAlign: "center", marginBottom: 10}}>You will be redirected to the landing page and will have to sign in again.</Paragraph>
                            <Card.Actions style={{justifyContent: 'center'}}>
                                <Button onPress={() => {setLogoutModalVisibility(false)}} style={{marginRight: 30}} color="black" mode="contained">Go Back</Button>
                                <Button onPress={doLogout} color="red" mode="contained">Log Out</Button>
                            </Card.Actions>
                        </Card.Content>
                    </Card>
                </View>
            </Modal>
          </SafeAreaView>)}
      </ImageBackground>
    );
  }
export default Solstice;