import React from "react";
import { SafeAreaView } from "react-native";
import { ImageBackground } from 'react-native';
import { Card,Paragraph,Title} from "react-native-paper";
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons'


function EmailVerification(){
    const navigation = useNavigation();
    const redirectHome = () => {
        navigation.navigate('login');
      }
    return(
        <ImageBackground
        source ={require('.././assets/solar_mobile.png')}
        style={{width:'100%', height: '100%'}}>
            <SafeAreaView>
                <View>
                <Title style={{marginTop:"20%",color:"white", textAlign:"center", fontWeight:"bold", fontSize: 30 }}>SOLSTICE</Title>
                </View>
            </SafeAreaView>
            <SafeAreaView style={{display: "flex", flex: 1,justifyContent : "center",allignItems: "center", flexDirection:"row"}}>
                <View style={{width: "90%", marginTop: "35%"}}>
                    <Card style={{borderRadius: 20}}>
                        <Card.Title titleStyle={{textAlign:"center"}} title="Check your E-Mail"></Card.Title>
                        <Card.Content>
                            <Paragraph style={{textAlign:"center",paddingBottom: 20}}>
                                We have sent an e-mail to verify your account. 
                                Please be sure to verify your account before logging in! 
                                You may need to check your spam/promotions folder.
                            </Paragraph>
                            <Button onPress={redirectHome} uppercase={false} color="black" mode="outlined">
                            <Ionicons name="ios-home" size={15} color="black" />                               
                                Go to Sign In
                            </Button>
                        </Card.Content>
                    </Card>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
export default EmailVerification;
