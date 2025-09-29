import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/reusable/ScreenWrapper";
import { useAuth } from "../../hooks/useAuth";

const Profile = () => {
  const { userData } = useAuth();
  return (
    <ScreenWrapper>
      <View style={{ flex: 1, paddingVertical: 20, paddingHorizontal: 20 }}>
        <View style={{ marginBottom: 20, justifyContent: "space-between" }}>
          <Text style={{ fontSize: 20, fontWeight: "500", marginBottom: 20 }}>
            Profile
          </Text>
        </View>
        <View style={{ width: "100%", flexDirection: "column", gap: 2 }}>
          <View style={styles.box}>
            <Text style={{ fontWeight: "500", width: 55 }}>Name :</Text>
            <Text>{userData?.name}</Text>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "500", width: 55 }}>Email :</Text>
            <Text>{userData?.email}</Text>
          </View>
          <View style={styles.box}>
            <Text style={{ fontWeight: "500", width: 55 }}>Role :</Text>
            <Text>{userData?.role}</Text>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  box: {
    width: "100%",
    flexDirection: "row",
    gap: 1,
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 8,
  },
});
