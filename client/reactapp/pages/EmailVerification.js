import React from "react";
import { SafeAreaView } from "react-native";
import { ImageBackground } from 'react-native';
import { Card,Paragraph} from "react-native-paper";
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";

function EmailVerification(){
    const navigation = useNavigation();
    const redirectHome = () => {
        navigation.navigate('login');
      }
    return(
        <ImageBackground
        source ={require('.././assets/solar_mobile.png')}
        style={{width:'100%', height: '100%'}}>
            <SafeAreaView style={{display: "flex", flex: 1,justifyContent : "center",allignItems: "center", flexDirection:"row"}}>
                <View style={{width: "90%", marginTop: "65%"}}>
                    <Card style={{borderRadius: 20}}>
                        <Card.Title titleStyle={{textAlign:"center"}} title="Check your E-Mail"></Card.Title>
                        <Card.Content>
                            <Paragraph style={{textAlign:"center",paddingBottom: 25}}>
                                We have sent an e-mail to verify your account. 
                                Please be sure to verify your account before logging in! 
                                You may need to check your spam/promotions folder.
                            </Paragraph>
                            <Button onPress={redirectHome} color="grey" mode="contained">Go Home</Button>
                        </Card.Content>
                    </Card>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}
export default EmailVerification;
