import * as React from "react";
import Home from "./Home";
import Profile from "./Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "react-native";
import Colors from "../../styles/Color";
import SvgHomeFill from "../../components/vectors/HomeFill";
import SvgHome from "../../components/vectors/Home";
import SvgUserFill from "../../components/vectors/UserFill";
import SvgUser from "../../components/vectors/User";
import Search from "./Search";
import SvgSearch from "../../components/vectors/Search";
const Tab = createBottomTabNavigator();

export default function _HomeLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors[0].bg} />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            width: "100%",
            height: 64,
            paddingTop: 6,
            backgroundColor: Colors[0].bg,
            borderTopWidth: 0.5,
            borderColor: "#00000007",
            elevation: 0,
            shadowColor: "transparent",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => {
              return focused ? <SvgHomeFill /> : <SvgHome />;
            },
          }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{
            headerShown: false,
            tabBarLabel: "",
            tabBarIcon: () => {
              return <SvgSearch strokeWidth={1.8} />;
            },
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarLabel: "",
            tabBarIcon: ({ focused }) => {
              return focused ? <SvgUserFill /> : <SvgUser />;
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
}
