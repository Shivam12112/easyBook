import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp2dp,
  widthPercentageToDP as wp2dp,
} from "react-native-responsive-screen";
import { useDispatch } from "react-redux";
import {
  handleFetchBookByName,
  handleOnboardingScreen,
  registerWithEmailAndPassword,
} from "../redux/slices";
import Loader from "./Loader";
import TextScreen from "./TextScreen";

function SignupScreen() {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(false);
  const [validated, setValidated] = useState({
    fullName: null,
    email: null,
    password: null,
    confirmPass: null,
  });

  const handleInputText = (label, value) => {
    if (label == "Name") setUserDetails({ ...userDetails, fullName: value });
    else if (label == "Password")
      setUserDetails({ ...userDetails, password: value });
    else if (label == "Username / Email")
      setUserDetails({ ...userDetails, email: value });
    else setUserDetails({ ...userDetails, confirmPassword: value });
  };

  const handleValidation = () => {
    console.log(userDetails);
  };

  useEffect(() => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;
    (() => {
      const newValidation = {
        fullName: userDetails.fullName ? true : false,
        email: userDetails.email ? true : false,
        password: regex.test(userDetails.password),
        confirmPass: userDetails.confirmPassword ? true : false,
        passwordMatched: userDetails.password === userDetails.confirmPassword,
      };
      setValidated(newValidation);
    })();
  }, [userDetails]);

  const handleRegister = async () => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;
    const newValidation = {
      fullName: userDetails.fullName ? true : false,
      email: userDetails.email ? true : false,
      password: regex.test(userDetails.password),
      confirmPass: userDetails.confirmPassword ? true : false,
      passwordMatched: userDetails.password === userDetails.confirmPassword,
    };
    setValidated(newValidation);
    setErrors(true);
    if (
      !(
        newValidation.fullName &&
        newValidation.email &&
        newValidation.password &&
        newValidation.passwordMatched
      )
    ) {
      return;
    }
    setLoading(true);
    dispatch(registerWithEmailAndPassword(userDetails))
      .then(() => {
        dispatch(handleFetchBookByName(""))
          .then(async () => {
            await dispatch(handleOnboardingScreen());
            setLoading(false);
            navigation.replace("HomeScreen");
          })
          .catch((err) => console.log("error in fetching books", err));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
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
            <Text style={{ fontSize: 28, color: "black" }}>Create Account</Text>
            <Text
              style={{
                marginTop: 8,
                color: "gray",
              }}
            >
              Join us for seamless access to a wide variety of books.
            </Text>
          </View>
        </View>
        <View style={[styles.sectionContainer, { marginTop: 20 }]}>
          <TextScreen
            label="Name"
            handleInputText={handleInputText}
            value={userDetails.fullName}
            keyboardType="default"
          />
          {errors && validated.fullName == false && (
            <Text style={{ color: "red", marginLeft: 8, marginTop: 2 }}>
              Name is required
            </Text>
          )}
          <TextScreen
            label="Username / Email"
            handleInputText={handleInputText}
            value={userDetails.email}
            keyboardType="email-address"
          />
          {errors && validated.email == false && (
            <Text style={{ color: "red", marginLeft: 8, marginTop: 2 }}>
              Email is required
            </Text>
          )}
          <TextScreen
            label="Password"
            secureTextEntry={true}
            keyboardType="password"
            handleInputText={handleInputText}
            value={userDetails.password}
          />
          {errors && validated.password == false && (
            <Text style={{ color: "red", marginLeft: 8, marginTop: 2 }}>
              Enter a valid password
            </Text>
          )}
          <TextScreen
            label="Confirm Password"
            secureTextEntry={true}
            keyboardType="password"
            handleInputText={handleInputText}
            value={userDetails.confirmPassword}
          />
          {errors &&
            (validated.confirmPass == false ? (
              <Text style={{ color: "red", marginLeft: 8, marginTop: 2 }}>
                Confirm password is required
              </Text>
            ) : (
              validated.passwordMatched == false && (
                <Text style={{ color: "red", marginLeft: 8, marginTop: 2 }}>
                  Password does not match
                </Text>
              )
            ))}
          <Text style={{ color: "black", marginLeft: 8, marginTop: 5 }}>
            Note - Password should have minimum of 8 characters, At least one
            uppercase letter, At least one lowercase letter. At least one
            number, At least one special character(!@#$%^&*(),.?":{}|<></>)
          </Text>
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
              onPress={handleRegister}
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
                paddingBottom: 20,
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
    marginTop: 20,
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

export default SignupScreen;
