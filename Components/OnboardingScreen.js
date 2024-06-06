import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import { useDispatch } from "react-redux";
import onboardingImage1 from "../assets/onboardingImage1.png";
import onboardingImage2 from "../assets/onboardingImage2.png";
import onboardingImage3 from "../assets/onboardingImage3.png";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

const OnboardingScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.container}>
      <Swiper
        loop={false}
        paginationStyle={{}}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
      >
        <View style={styles.slide}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.replace("LoginScreen")}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
          <Image source={onboardingImage1} style={styles.image} />

          <Text style={styles.title}>Books Has Power To Chnage Everything</Text>
          <Text style={styles.text}>
            We have true friend in our life and the books is that. Book has
            power to chnage yourself and make you more valueable.
          </Text>
        </View>
        <View style={styles.slide}>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => navigation.replace("LoginScreen")}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
          <Image source={onboardingImage2} style={styles.image} />
          <Text style={styles.title}>Learn Smartly</Text>
          <Text style={styles.text}>
            It's 2022 and it's time to learn every quickly and smartly. All
            books are storage in cloud and you can access all of them from your
            laptop or PC.
          </Text>
        </View>
        <View style={styles.slide}>
          <TouchableOpacity
            disabled={true}
            style={[styles.skipButton, { opacity: 0 }]}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
          <Image source={onboardingImage3} style={styles.image} />
          <Text style={styles.title}>Only Books Can Help You</Text>
          <Text style={styles.text}>
            Books can help you to increase your knowledge and become more
            successfully.
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.replace("LoginScreen");
            }}
            style={{
              marginTop: 20,
              justifyContent: "center",
              height: 40,
              width: 200,
              backgroundColor: "#1581ed",
              borderRadius: 5,
            }}
          >
            <Text style={[styles.text, { color: "#fff" }]}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  dotStyle: {
    backgroundColor: "#c4c4c4",
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  activeDotStyle: {
    backgroundColor: "#1581ed",
    width: 40,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  slide: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  skipButton: {
    alignSelf: "flex-end",
    marginRight: widthPercentageToDP(1),
    marginVertical: heightPercentageToDP(5)
  },
  skipButtonText: {
    color: "#000",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "contain",
    // marginVertical: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    color: "#7e7e7e",
  },
});

export default OnboardingScreen;
