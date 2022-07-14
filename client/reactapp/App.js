import React from "react";
import { Provider as PaperProvider} from "react-native-paper";
//import { Switch, Route, NativeRouter} from "react-router-native";
import { NativeRouter, Route,Routes,Switch} from "react-router-native";
import { View} from "react-native";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

export default function App(){
    return (
        <NativeRouter>
          <View>
            <Routes>
              <Route exact path="/" element={<LoginPage/>}/>
              <Route exact path="/signup" element={<SignupPage/>}/>
            </Routes>
          </View>
        </NativeRouter>
    );
  }
