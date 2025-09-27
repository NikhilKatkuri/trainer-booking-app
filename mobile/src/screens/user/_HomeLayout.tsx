import * as React from "react";
import Home from "./Home";
import Profile from "./Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import Colors from "../../styles/Color";
const Tab = createBottomTabNavigator();

export default function _HomeLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors[0].bg} />
      <Tab.Navigator>
        <Tab.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={Profile}
        />
      </Tab.Navigator>
    </>
  );
}
