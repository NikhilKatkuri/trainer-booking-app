import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { TouchableOpacityProps } from "react-native";
import Colors from "../styles/Color";

interface Props extends TouchableOpacityProps {
  title: string;
  variant: "fill" | "outline";
}
const Button = ({ ...props }: Props) => {
  return (
    <TouchableOpacity {...props}>
      <View style={props.variant === "fill" ? styles.fill : props.variant === "outline" ? styles.outline : {}}>
        <Text style={props.variant === "fill" ? styles.fillText : props.variant === "outline" ? styles.outlineText : {}}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  fill: {
    backgroundColor: Colors[0].primaryBtn,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: "100%",
  },
  fillText: {
    fontSize: 16,
    fontWeight: 400,
    color: "#fff",
    textAlign: "center",
  },
  outline: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors[0].primaryBtn,
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: "100%",
  },
  outlineText: {
    fontSize: 16,
    fontWeight: 400,
    color: Colors[0].primaryBtn,
    textAlign: "center",
  },
});
