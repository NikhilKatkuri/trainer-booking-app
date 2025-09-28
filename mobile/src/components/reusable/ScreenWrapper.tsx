import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../../styles/Color";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors[0].bg} />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors[0].bg }}>
        {children}
      </SafeAreaView>
    </>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({});
