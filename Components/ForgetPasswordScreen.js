import { useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth";
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
import FlashMessage, { showMessage } from "react-native-flash-message";
import {
  heightPercentageToDP as hp2dp,
  widthPercentageToDP as wp2dp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import { auth } from "../authentication/firebaseConfig";
import Loader from "./Loader";
import TextScreen from "./TextScreen";

function ForgetPasswordScreen() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleInputText = (label, value) => {
    if (label == "Password")
      setLoginDetails({ ...loginDetails, password: value });
    else setLoginDetails({ ...loginDetails, email: value });
  };
  const validateLogin = () => {
    var re = /\S+@\S+\.\S+/;
    const email = re.test(loginDetails.email);
  };
  const handleForgetPassword = () => {
    setLoading(true);
    sendPasswordResetEmail(auth, loginDetails.email)
      .then(() => {
        showMessage({
          message: "Email Sent",
          description:
            "Password reset email sent successfully. Please check your email.",
          type: "success",
          duration: 3000, // 3 seconds
          floating: true,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.code);
        setLoading(false);
        if (err.code === "auth/invalid-email")
          showMessage({
            message: "Invalid Email",
            description: "The email address is badly formatted.",
            type: "danger",
            duration: 3000, // 3 seconds
            floating: true,
          });
        else
          showMessage({
            message: "Error",
            description: err.code,
            type: "danger",
            duration: 3000, // 3 seconds
            floating: true,
          });
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar />
      {/* <FlashMessage position="top" /> */}
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
              height: 130,
              width: 130,
            }}
            source={require("../assets/open-book-icon.png")}
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
            <Text style={{ fontSize: 28, color: "black" }}>
              Forget Password
            </Text>
            <Text
              style={{
                marginTop: 8,
                color: "gray",
              }}
            >
              Please enter your registered email, and we will send you a reset
              link.
            </Text>
          </View>
        </View>
        <View style={[styles.sectionContainer, { marginTop: 20 }]}>
          <TextScreen
            label="Email Address"
            secureTextEntry={false}
            keyboardType="password"
            handleInputText={handleInputText}
            value={loginDetails.email}
          />
        </View>
        <View style={styles.sectionContainer}>
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              disabled={!loginDetails.email}
              onPress={handleForgetPassword}
              style={[
                styles.loginButton,
                !loginDetails.email && { backgroundColor: "#adadaa" },
              ]}
            >
              <Text style={{ fontSize: 18, color: "white", fontWeight: "700" }}>
                Send Link
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
              }}
            >
              <Text
                style={{ fontSize: 14, color: "#1581ed" }}
                onPress={() => navigation.navigate("LoginScreen")}
              >
                Back to Login
              </Text>
            </View>
          </View>
        </View>
        <Loader loading={loading} />
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
    borderRadius: 5,
    width: wp2dp(85),
    height: 45,
  },
  flashMessage: {
    borderRadius: 12,
    marginHorizontal: 40,
  },
});

export default ForgetPasswordScreen;
