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

const Login = () => {
  const navigation = useNavigation();
  const { loginData, setLoginData } = useAuth();
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
              Welcome back!
            </Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 400,
                color: Colors[0].textSecondary,
              }}
            >
              Login to your account.
            </Text>
          </View>
          <View style={{ width: "100%", marginVertical: 36, gap: 24 }}>
            <InputText
              value={loginData.email}
              onChangeText={(text) => {
                setLoginData((prev) => ({ ...prev, email: text }));
              }}
              variant="Text"
              placeholder="Email"
            />
            <InputText
              value={loginData.password}
              onChangeText={(text) => {
                setLoginData((prev) => ({ ...prev, password: text }));
              }}
              variant="Password"
              placeholder="Password"
            />
            <View style={{ marginTop: 12 }}>
              <Button title="Login" variant="fill" />
            </View>
            <View style={{ alignItems: "center", marginTop: 12, gap: 8 }}>
              <View style={{ flexDirection: "row", gap: 2 }}>
                <Text style={{ color: Colors[0].textSecondary }}>
                  Don't have an account?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.canGoBack()
                      ? (() => {
                          navigation.goBack();
                          navigation.navigate("signup" as never);
                        })()
                      : navigation.navigate("signup" as never)
                  }
                >
                  <Text style={{ color: Colors[0].primaryBtn }}>Sign Up</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: "row", gap: 2 }}>
                <Text style={{ color: Colors[0].textSecondary }}>
                  Forgot your password?{" "}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.canGoBack()
                      ? (() => {
                          navigation.goBack();
                          navigation.navigate("forgotpassword" as never);
                        })()
                      : navigation.navigate("forgotpassword" as never)
                  }
                >
                  <Text style={{ color: Colors[0].primaryBtn }}>Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({});
