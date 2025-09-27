import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const { setIsAuthenticated } = useAuth();
  return (
    <View>
      <Text>Home</Text>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.removeItem("token");
          setIsAuthenticated(false);
        }}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
