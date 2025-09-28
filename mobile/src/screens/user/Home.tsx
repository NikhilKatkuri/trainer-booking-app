import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/reusable/ScreenWrapper";
import { useAuth } from "../../hooks/useAuth";

const Home = () => {
  const { userData, handleLogout } = useAuth();
  return (
    <ScreenWrapper>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 100,
            width: "100%",
            flexDirection: "row",
            // backgroundColor: "white",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <View>
            <Text style={{ fontSize: 14, fontWeight: "400" }}>Hello ,</Text>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              {userData?.name.slice(0, 12) || "User"}
            </Text>
          </View>
          <TouchableOpacity onPress={handleLogout}>
            <View>
              <Text>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text>Home Screen</Text>
      </View>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
