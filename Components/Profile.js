import React from "react";

import {
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import moment from "moment";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Avatar, Divider } from "react-native-paper";
import {
  heightPercentageToDP as hp2dp,
  widthPercentageToDP as wp2dp,
} from "react-native-responsive-screen";
import { useSelector } from "react-redux";

function Profile() {
  
  const { loggedInUser } = useSelector((state) => state);
  

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#f3eaff",
      }}
    >
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            marginTop: hp2dp(5),
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <Avatar.Image
            size={140}
            source={
              loggedInUser.profilePicture
                ? {
                    uri: loggedInUser.profilePicture,
                  }
                : require("../assets/avatar.jpg")
            }
          />
        </View>
        <View
          style={{
            marginTop: hp2dp(1),
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 20 }}>{loggedInUser.displayName}</Text>
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
            <Text style={{ fontSize: 25, color: "black" }}>Personal Info</Text>
          </View>
        </View>
        <View style={[styles.sectionContainer, { marginTop: 20 }]}>
          <View style={styles.rowItem}>
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <MaterialIcons
                color="black"
                size={24}
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  marginRight: 5,
                }}
                name="email"
              />
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.profileDetailsText3}>Email</Text>
                <Text
                  style={[styles.profileDetailsText2, { width: wp2dp("46%") }]}
                >
                  {loggedInUser.email}
                </Text>
              </View>
            </View>
          </View>
          <Divider
            bold
            style={{ marginTop: hp2dp(0.5), marginBottom: hp2dp(1) }}
          />
          <View style={styles.rowItem}>
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <MaterialCommunityIcons
                color="black"
                size={24}
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  marginRight: 5,
                }}
                name={loggedInUser?.gender == 1 ? "human-male" : "human-female"}
              />
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.profileDetailsText3}>Gender</Text>
                <Text
                  style={[styles.profileDetailsText2, { width: wp2dp("46%") }]}
                >
                  {loggedInUser?.gender
                    ? loggedInUser?.gender == 1
                      ? "Male"
                      : "Female"
                    : "NA"}
                </Text>
              </View>
            </View>
          </View>
          <Divider
            bold
            style={{ marginTop: hp2dp(0.5), marginBottom: hp2dp(1) }}
          />
          <View style={styles.rowItem}>
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <MaterialIcons
                color="black"
                size={24}
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  marginRight: 5,
                }}
                name="cake"
              />
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.profileDetailsText3}>Date of Birth</Text>
                <Text
                  style={[styles.profileDetailsText2, { width: wp2dp("46%") }]}
                >
                  {loggedInUser?.dateOfBirth
                    ? moment
                        .unix(loggedInUser?.dateOfBirth)
                        .format("DD-MM-YYYY")
                    : "-- / -- / ----"}
                </Text>
              </View>
            </View>
          </View>
          <Divider
            bold
            style={{ marginTop: hp2dp(0.5), marginBottom: hp2dp(1) }}
          />
          <View style={styles.rowItem}>
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <MaterialIcons
                color="black"
                size={24}
                style={{
                  justifyContent: "center",
                  alignSelf: "center",
                  marginRight: 5,
                }}
                name="date-range"
              />
              <View style={{ justifyContent: "center" }}>
                <Text style={styles.profileDetailsText3}>Date of Join</Text>
                <Text
                  style={[styles.profileDetailsText2, { width: wp2dp("46%") }]}
                >
                  {moment.unix(loggedInUser?.dateOfJoin).format("DD-MMM-YYYY")}
                </Text>
              </View>
            </View>
          </View>
          <Divider
            bold
            style={{ marginTop: hp2dp(0.5), marginBottom: hp2dp(1) }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 30,
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
  rowItem: {
    borderColor: "black",
    marginTop: 5,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  profileDetailsText2: {
    paddingLeft: 5,
    marginTop: -2,
    fontSize: 14,
  },
  profileDetailsText3: {
    paddingLeft: 5,
    fontSize: 12,
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

export default Profile;
