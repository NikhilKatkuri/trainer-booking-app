import {
  StyleSheet,
  Text,
  View,
  TextInputProps,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../styles/Color";

interface Props extends TextInputProps {
  variant: "Text" | "Password";
}
const InputText = ({ ...props }: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <View style={{ width: "100%", gap: 2 }}>
      {props.variant === "Text" && (
        <TextInput {...props} style={[styles.inputFeild, props.style]} />
      )}
      {props.variant === "Password" && (
        <View
          style={{
            flexDirection: "row",
            maxWidth: "90%",
            alignItems: "center",
          }}
        >
          <TextInput
            secureTextEntry={!showPassword}
            {...props}
            style={[styles.inputFeild, props.style]}
          />
          <TouchableOpacity
            onPress={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            <Text>{showPassword ? "hide" : "show"}</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.inputFeildBase} />
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  inputFeild: {
    width: "100%",
    height: 40,
    fontSize: 16,
  },
  inputFeildBase: {
    width: "100%",
    height: 2,
    borderRadius: 24,
    backgroundColor: Colors[0].border,
  },
});
