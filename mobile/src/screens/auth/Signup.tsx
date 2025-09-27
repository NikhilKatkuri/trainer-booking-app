import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../../styles/Color";
import InputText from "../../components/InputText";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";

const Signup = () => {
  const navigation = useNavigation();
  const { SignUPData, setSignUPData, handleSignUp } = useAuth();
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={Colors[0].bg} />
      <View style={{ flex: 1, backgroundColor: Colors[0].bg }}>
        <View>
          <TouchableOpacity
            style={{ padding: 16, marginTop: 16 }}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: Colors[0].text }}>Back</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "flex-start",
            backgroundColor: Colors[0].bg,
            padding: 24,
          }}
        >
          <View>
            <Text
              style={{ fontSize: 24, fontWeight: 500, color: Colors[0].text }}
            >
              hey there,
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 400,
                color: Colors[0].textSecondary,
              }}
            >
              Let's get you signed up.
            </Text>
          </View>
          <View style={{ width: "100%", marginVertical: 36, gap: 24 }}>
            <InputText
              value={SignUPData.email}
              onChangeText={(text) => {
                setSignUPData({ ...SignUPData, email: text });
              }}
              variant="Text"
              placeholder="Email"
            />
            <InputText
              value={SignUPData.name}
              onChangeText={(text) => {
                setSignUPData({ ...SignUPData, name: text });
              }}
              variant="Text"
              placeholder="Full Name"
            />
            <InputText
              value={SignUPData.password}
              onChangeText={(text) => {
                setSignUPData({ ...SignUPData, password: text });
              }}
              variant="Password"
              placeholder="Password"
            />
            <InputText
              value={SignUPData.confirmPassword}
              onChangeText={(text) => {
                setSignUPData({ ...SignUPData, confirmPassword: text });
              }}
              variant="Password"
              placeholder="Confirm Password"
            />
            <View style={{ marginTop: 12 }}>
              <Button
                onPress={async () => {
                  await handleSignUp();
                }}
                title="Sign Up"
                variant="fill"
              />
            </View>
            <View style={{ alignItems: "center", marginTop: 12, gap: 8 }}>
              <View style={{ flexDirection: "row", gap: 2 }}>
                <Text style={{ color: Colors[0].textSecondary }}>
                  Already have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.canGoBack()
                      ? (() => {
                          navigation.goBack();
                          navigation.navigate("login" as never);
                        })()
                      : navigation.navigate("login" as never)
                  }
                >
                  <Text style={{ color: Colors[0].primaryBtn }}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Signup;

const styles = StyleSheet.create({});
