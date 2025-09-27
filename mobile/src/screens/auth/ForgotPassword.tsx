import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../styles/Color";
import InputText from "../../components/InputText";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setemail] = useState("");
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
              Let's find your account.
            </Text>
          </View>
          <View style={{ width: "100%", marginVertical: 36, gap: 24 }}>
            <InputText value={email} onChangeText={(text)=>{
              setemail(text);
            }} variant="Text" placeholder="Email" />
            <View style={{ marginTop: 12 }}>
              <Button onPress={() => {
                navigation.navigate("display", { email: email });
              }} title="Find" variant="fill" />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
