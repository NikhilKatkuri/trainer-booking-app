import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LandingScreen from "./src/screens/LandingScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import _HomeLayout from "./src/screens/user/_HomeLayout";
import Login from "./src/screens/auth/Login";
import Signup from "./src/screens/auth/Signup";
import ForgotPassword from "./src/screens/auth/ForgotPassword";
import { AuthProvider, useAuth } from "./src/hooks/useAuth";
import Colors from "./src/styles/Color";
import Display from "./src/screens/auth/Display";

const Stack = createNativeStackNavigator();
const RootLayout = () => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated === undefined) {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={Colors[0].bg} />
        <View
          style={{
            flex: 1,
            backgroundColor: Colors[0].bg,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator color={Colors[0].primaryBtn} size="large" />
          <Text
            style={{
              color: Colors[0].text,
              textAlign: "center",
              marginTop: 12,
            }}
          >
            Checking Authentication...
          </Text>
        </View>
      </>
    );
  }
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors[0].bg} />
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
          <Stack.Screen
            name="Homelayout"
            options={{ headerShown: false }}
            component={_HomeLayout}
          /></>
        ) : (
          <>
            <Stack.Screen
              name="landing"
              options={{ headerShown: false }}
              component={LandingScreen}
            />
            <Stack.Screen
              name="login"
              options={{ headerShown: false }}
              component={Login}
            />
            <Stack.Screen
              name="signup"
              options={{ headerShown: false }}
              component={Signup}
            />
            <Stack.Screen
              name="forgotpassword"
              options={{ headerShown: false }}
              component={ForgotPassword}
            />
            <Stack.Screen
              name="display"
              options={{ headerShown: false }}
              component={Display}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};
const App = () => {
  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <RootLayout />
        </NavigationContainer>
      </GestureHandlerRootView>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
