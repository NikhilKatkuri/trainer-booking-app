import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const { setIsAuthenticated } = useAuth();
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View>
        <Text>Home</Text>
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem("token");
            setIsAuthenticated(false);
          }}
        >
          <View
            style={{
              marginTop: 20,
              padding: 12,
              backgroundColor: "red",
              width: 200,
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <Text style={{ color: "white" }}>Delete</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
