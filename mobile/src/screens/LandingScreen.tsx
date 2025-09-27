import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { use } from "react";
import Colors from "../styles/Color";
import { useNavigation } from "@react-navigation/native";
import Button from "../components/Button";

const LandingScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar backgroundColor={Colors[0].bg} barStyle={"dark-content"} />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors[0].bg,
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 24,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: 500,
            color: Colors[0].text,
            marginBottom: 24,
          }}
        >
          Trainer booking App
        </Text>
        <View style={{ gap: 12, width: "80%", marginBottom: 42 }}>
          <Button
            onPress={() => {
              navigation.navigate("login" as never);
            }}
            activeOpacity={0.7}
            variant="fill"
            title="Get started"
          />
          <Button
            onPress={() => {
              navigation.navigate("signup" as never);
            }}
            activeOpacity={0.7}
            title="Register"
            variant="outline"
          />
        </View>
        <Text
          style={{
            fontSize: 12,
            color: Colors[0].text,
            marginTop: 20,
            textAlign: "center",
          }}
        >
          &copy; 2024 Tranier Booking App. @Nikhil Katkuri.
        </Text>
      </View>
    </>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({});
