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
    const [name, setName] = useState('');
    const [mass, setMass] = useState('');
    const [gravitionalPull, setGravitionalPull] = useState(0);
    const [distance, setDistance] = useState(0);
    const [color, setColor] = useState('');

    const navigation = useNavigation();

    const route = useRoute();

    console.log(route.params.id);

    async function handleSubmit(e) {
        e.preventDefault();

    }

    return (
        <View style={{width:'100%', height: '100%'}}>
            <SafeAreaView style={planetPageStyle.container}>
                <Card style={planetPageStyle.card} >
                    <Card.Title titleStyle={{textAlign:"center"}} title="Planet Name"></Card.Title>
                    <Card.Content>
                        <TextInput onChangeText={setName} autoCapitalize='none' autoCorrect={false} label="Name"></TextInput>
                        <TextInput onChangeText={setMass} autoCapitalize='none' autoCorrect={false} label="Mass"></TextInput>
                        <TextInput onChangeText={setGravitionalPull} autoCapitalize='none' autoCorrect={false} label="Gravitional Pull"></TextInput>
                        <TextInput onChangeText={setDistance} autoCapitalize='none' autoCorrect={false} label="Distance"></TextInput>
                        <TextInput onChangeText={setColor} autoCapitalize='none' autoCorrect={false} label="Color"></TextInput>
                        {/* <TextInput autoCapitalize='none' autoCorrect={false} label="Moons"></TextInput> */}
                        <Card.Actions style={{justifyContent: "center"}}>
                            <Button onPress={handleSubmit} color="grey" mode="contained">Save</Button>
                            {/* <Button color="blue" uppercase={false}>Forgot your password?</Button> */}
                        </Card.Actions>
                        {/* <Paragraph style={{textAlign:"center"}}>Don't have an account?</Paragraph>
                            <Button onPress={redirectSignup} color="blue" uppercase={false}>Sign up now.</Button> */}
                    </Card.Content>
                </Card>
            </SafeAreaView>
        </View>
    );
  }
export default Planet;