import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../styles/Color';

const Loader = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color={Colors[0].primaryBtn} />
    </View>
  );
}

export default Loader

const styles = StyleSheet.create({})