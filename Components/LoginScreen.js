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
import FlashMessage, { showMessage } from "react-native-flash-message";
import {
  heightPercentageToDP as hp2dp,
  widthPercentageToDP as wp2dp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import {
  handleFetchBookByName,
  handleOnboardingScreen,
  loginWithEmailAndPassword,
} from "../redux/slices";
import Loader from "./Loader";
import TextScreen from "./TextScreen";

function LoginScreen() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
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
  const handleLogin = () => {
    if (loginDetails.email || loginDetails.password) {
      setLoading(true);
      dispatch(loginWithEmailAndPassword(loginDetails))
        .then((res) => {
          setLoading(false);
          if (!res?.payload?.uid) {
            showMessage({
              message: "Error!",
              description: res?.payload,
              type: "danger",
              duration: 4000, // 3 seconds
              floating: true,
            });
          } else {
            dispatch(handleFetchBookByName("")).then(() => {
              dispatch(handleOnboardingScreen());
              navigation.replace("HomeScreen");
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log("error :", err);
        });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <StatusBar />
      <FlashMessage position="top" />
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
            <Text style={{ fontSize: 28, color: "black" }}>Sign In</Text>
            <Text
              style={{
                marginTop: 8,
                color: "gray",
              }}
            >
              Please Signin to continue.
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
          <TextScreen
            label="Password"
            secureTextEntry={true}
            keyboardType="password"
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
            <TouchableOpacity
              onPress={handleLogin}
              style={[
                styles.loginButton,
                (!loginDetails.email || !loginDetails.password) && {
                  backgroundColor: "#adadaa",
                },
              ]}
              disabled={!loginDetails.email || !loginDetails.password}
            >
              <Text style={{ fontSize: 18, color: "white", fontWeight: "700" }}>
                Sign In
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
              <Text
                style={{ fontSize: 14, color: "#1581ed" }}
                onPress={() => navigation.navigate("ForgetPasswordScreen")}
              >
                Forget Password?
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
});

export default LoginScreen;
