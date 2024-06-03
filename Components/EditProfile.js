import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
import { auth, database } from "../authentication/firebaseConfig";
import Loader from "./Loader";
import TextScreen from "./TextScreen";

function EditProfile() {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      )
        .then(async (res) => {
          const user = auth.currentUser;
          const userRef = doc(database, "users", user.uid);
          setDoc(userRef, {
            displayName: userDetails.fullName,
            email: userDetails.email,
            uid: user.uid,
          });
        })
        .then(() => {
          setLoading(false);
          navigation.replace("TabViewScreen");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={{
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
          <TextScreen
            label="Username / Email"
            handleInputText={handleInputText}
            value={userDetails.email}
            keyboardType="email-address"
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
            value={userDetails.confirmPassword}
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

export default EditProfile;
