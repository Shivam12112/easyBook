import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TextScreen from "./TextScreen";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../authentication/firebaseConfig";
import {
  heightPercentageToDP as hp2dp,
  widthPercentageToDP as wp2dp,
} from "react-native-responsive-screen";
import { doc, setDoc } from "firebase/firestore";

function SignupScreen() {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigation = useNavigation();

  const handleInputText = (label, value) => {
    if (label == "Name") setUserDetails({ ...userDetails, fullName: value });
    else if (label == "Password")
      setUserDetails({ ...userDetails, password: value });
    else if (label == "Username / Email")
      setUserDetails({ ...userDetails, email: value });
    else setUserDetails({ ...userDetails, confirmPassword: value });
  };

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      )
        .then(async (res) => {
          const user = auth.currentUser;
          console.log(user);
          const userRef = doc(database, "users", user.uid);
          setDoc(userRef, {
            displayName: userDetails.fullName,
            email: userDetails.email,
            uid: user.uid,
          });
        })
        .then(() => {
          navigation.replace("HomeScreen");
        });
    } catch (error) {
      console.log(error);
    }
  };

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
            marginTop: hp2dp(10),
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <Image
            style={{
              height: 150,
              width: 150,
            }}
            source={require("../assets/logo.png")}
          />
        </View>
        <View
          style={{
            marginTop: 32,
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ width: wp2dp(85) }}>
            <Text style={{ fontSize: 28, color: "black" }}>Sign Up</Text>
            <Text>Please Signin to continue</Text>
          </View>
        </View>
        <View style={[styles.sectionContainer, { marginTop: 20 }]}>
          <TextScreen
            label="Name"
            handleInputText={handleInputText}
            value={userDetails.fullName}
          />
          <TextScreen
            label="Username / Email"
            handleInputText={handleInputText}
            value={userDetails.email}
          />
          <TextScreen
            label="Password"
            secureTextEntry={true}
            keyboardType="password"
            handleInputText={handleInputText}
            value={userDetails.password}
          />
          <TextScreen
            label="Confirm Password"
            secureTextEntry={true}
            keyboardType="password"
            handleInputText={handleInputText}
            value={userDetails.confirmPassword  }
          />
        </View>
        <View style={styles.sectionContainer}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              // alignContent: 'center',
              flexDirection: "row",
              // alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleRegister();
              }}
              style={styles.loginButton}
            >
              <Text style={{ fontSize: 18, color: "white", fontWeight: "700" }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <Text style={{ fontSize: 14, color: "black" }}>
                Already have an account?{"  "}
                <Text
                  style={{ fontSize: 14, color: "#1581ed" }}
                  onPress={() => navigation.navigate("LoginScreen")}
                >
                  Login
                </Text>
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: 14, color: "#1581ed" }}>
                Forget Password?
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
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

  loginButton: {
    height: 35,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1581ed",
    borderBottomWidth: 2,
    width: wp2dp(85),
    height: 45,
    // borderRadius: 5,
  },
});

export default SignupScreen;
