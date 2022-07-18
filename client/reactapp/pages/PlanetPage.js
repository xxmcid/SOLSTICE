import axios from "axios";
import React, { useEffect } from "react";
import { View } from 'react-native';
import { ScrollView } from 'react-native';
import { Card, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginpageStyle } from "./loginstyle";
import { useNavigation } from "@react-navigation/native";
import { useState, useReducer } from "react";
import { SidePanel } from '../components/SidePanel';



function Planet() {
    return (
        <View>
            <ScrollView horizontal={true}>
                <SidePanel />
            </ScrollView>
        </View>
    );
  }
export default Planet;