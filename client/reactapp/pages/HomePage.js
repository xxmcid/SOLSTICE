import React from "react";
import { SafeAreaView } from "react-native";
import { ImageBackground, } from 'react-native';
import { Card,Paragraph,Title} from "react-native-paper";
import { View } from 'react-native';
import { Button,TextInput, HelperText} from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

function HomePage(){
    const navigation = useNavigation();

    return(
        <ImageBackground
        source ={require('.././assets/solar_gif.gif')}
        style={{width:'100%', height: '100%'}}>                
            <SafeAreaView>
            <View>
              <Title style={{paddingTop: "25%", marginBottom:"25%",color:"white", textAlign:"center", fontWeight:"bold", fontSize: 50 }}>SOLSTICE</Title>
            </View>
            <View style={{marginTop: "100%", alignItems:"center"}}>
                <Button style={{borderRadius: 5}} onPress={() => {navigation.navigate('login')}} width="40%" uppercase={false} color="white" mode="contained">Get Started</Button>  
            </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
export default HomePage;