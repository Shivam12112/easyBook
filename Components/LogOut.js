import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { widthPercentageToDP as wp2dp } from "react-native-responsive-screen";
import { auth } from "../authentication/firebaseConfig";
import { persistor } from "../redux/store";

function LogOut() {
  const navigation = useNavigation();

  const handleLogOut = () => {
    auth.signOut();
    persistor.purge();
    navigation.replace("LoginScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            marginTop: 32,
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          <View style={{ width: wp2dp(85) }}>
            <Text style={styles.sectionTitle}>Log Out</Text>
            <Text
              style={{
                marginTop: 8,
                // color: "gray",
              }}
            >
              Do you really want to logout of the app?
            </Text>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={[[styles.cancleButton]]}
              onPress={() => navigation.replace("HomeScreen")}
            >
              <Text style={{ fontSize: 18, color: "black", fontWeight: "700" }}>
                No
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleLogOut}
              style={[styles.logoutButton]}
            >
              <Text style={{ fontSize: 18, color: "white", fontWeight: "700" }}>
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3eaff",
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },

  logoutButton: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1581ed",
    borderRadius: 5,
    width: wp2dp(40),
    height: 45,
  },
  cancleButton: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.2,
    borderRadius: 5,
    width: wp2dp(40),
    height: 45,
  },
  flashMessage: {
    borderRadius: 12,
    marginHorizontal: 40,
  },
});

export default LogOut;
