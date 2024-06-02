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
import {
  heightPercentageToDP as hp2dp,
  widthPercentageToDP as wp2dp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFetchBookByName,
  handleOnboardingScreen,
  loginWithEmailAndPassword,
} from "../redux/slices";
import Loader from "./Loader";
import TextScreen from "./TextScreen";

function LoginScreen() {
  const [loginDetails, setLoginDetails] = useState({
    email: "svm.kushwaha@gmail.com",
    password: "Admin@123",
  });

  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleInputText = (label, value) => {
    if (label == "Password")
      setLoginDetails({ ...loginDetails, password: value });
    else setLoginDetails({ ...loginDetails, email: value });
  };

  const handleLogin = () => {
    setLoading(true);
    dispatch(loginWithEmailAndPassword(loginDetails)).then((res) => {
      dispatch(handleFetchBookByName("")).then(() => {
        setLoading(false);
        dispatch(handleOnboardingScreen());
        navigation.replace("TabViewScreen");
      });
    });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
    >
      <StatusBar />
      <Loader loading={loading} />
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
            <Text style={{ fontSize: 28, color: "black" }}>Login</Text>
            <Text>Please Signin to continue</Text>
          </View>
        </View>
        <View style={[styles.sectionContainer, { marginTop: 20 }]}>
          <TextScreen
            label="Username / Email"
            handleInputText={handleInputText}
            value={loginDetails.email}
          />
          <TextScreen
            label="Password"
            secureTextEntry={true}
            handleInputText={handleInputText}
            value={loginDetails.password}
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
            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
              <Text style={{ fontSize: 18, color: "white", fontWeight: "700" }}>
                Login
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
                Do not have an account?{"  "}
                <Text
                  style={{ fontSize: 14, color: "#1581ed" }}
                  onPress={() => navigation.navigate("SignupScreen")}
                >
                  Sign Up
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

export default LoginScreen;
