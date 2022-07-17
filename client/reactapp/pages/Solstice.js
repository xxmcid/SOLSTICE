import React from "react";
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { loginpageStyle } from "./loginstyle";



const SystemCard = ({systemName}) => (
    <Card onPress={() => {console.log(systemName);}}>
        <Card.Cover source={{uri: "https://http.cat/200"}} />
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
        <Card.Cover source={{uri: "https://http.cat/401"}} />
    </Card>
);

const Test = () => {
    let newCards = [];
    for(let i = 0; i < 9; i++) 
    {
        newCards.push(
            <SystemCard key={i} systemName={"Solar System " + i}/>
        );
    }
    return newCards;
}

const Test1 = () => {
    let newCards = [];
    for(let i = 0; i < 9; i++)
    {
        newCards.push(
            <PlanetCard key={i} planetName={"Planet " + (i+1)} />
        );
    }
    return newCards;
}

function Solstice() {
    return (
        <View>
            <View>
                <ScrollView horizontal={true}>
                    {Test()}
                </ScrollView>
            </View>
            <View>
                <ScrollView contentContainerStyle={{flexDirection: "row", flexWrap: "wrap"}}>
                    {Test1()}
                </ScrollView>
            </View>
        </View>
    );
  }
export default Solstice;