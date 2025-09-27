import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Colors from "../../styles/Color"; 
import { useNavigation, useRoute } from "@react-navigation/native";

type DisplayRouteParams = { email: string };

const Display = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = (route.params as DisplayRouteParams);
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
          <Text>
               mail Id : {email}
          </Text>
        </View>
      </View>
    </>
  );
};

export default Display;

const styles = StyleSheet.create({});
