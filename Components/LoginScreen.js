import React from "react";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function LoginScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            marginTop: 100,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <Image
            style={{
              height: 200,
              width: 200,
            }}
            source={require("../assets/logo.png")}
          />
        </View>

        <View style={styles.sectionContainer}>
          <View
            style={{
              // height: 35,
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#DE7773",
              borderRadius: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("homeScreen");
              }}
              style={{
                height: 35,
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                flexDirection: "row",
                alignItems: "center",
                lignItems: "center",
                backgroundColor: "#DE7773",
                borderRadius: 20,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "700" }}>
                Home Screen
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    color: "white",
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default LoginScreen;
