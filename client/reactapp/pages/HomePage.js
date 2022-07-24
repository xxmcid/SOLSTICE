import React from "react";
import { SafeAreaView } from "react-native";
import { ImageBackground, } from 'react-native';
import { Card,Paragraph,Title} from "react-native-paper";
import { View } from 'react-native';
import { Button,TextInput, HelperText} from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

function HomePage(){
    const navigation = useNavigation();

    const redirectSignup = () => {
        navigation.navigate('signup');
      }
      
      const redirectLogin = () => {
        navigation.navigate('login');
      }
    return(
        <ImageBackground
        source ={require('.././assets/solar_gif.gif')}
        style={{width:'100%', height: '100%'}}>                
            <SafeAreaView>
            <View>
              <Title style={{marginTop:"15%",marginBottom:"1%",color:"white", textAlign:"center", fontWeight:"bold", fontSize: 30 }}>SOLSTICE</Title>
            </View>
            <View style={{marginTop: "130%", alignItems:"center"}}>
                <Button style={{borderRadius: 10}} onPress={redirectLogin} width="40%" uppercase={false} color="white" mode="contained">Get Started</Button>  
            </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
export default HomePage;