import React, { useMemo, useState } from "react";
import RadioGroup from "react-native-radio-buttons-group";

import { Foundation } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import {
  heightPercentageToDP as hp2dp,
  widthPercentageToDP as wp2dp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { app } from "../authentication/firebaseConfig";
import Loader from "./Loader";
import TextScreen from "./TextScreen";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import moment from "moment";
import { showMessage } from "react-native-flash-message";
import { handleUpdateProfile } from "../redux/slices";
import DatePicker from "./DatePicker";
import ImagePickerModal from "./ImagePickerModal";

function EditProfile() {
  const { loggedInUser } = useSelector((state) => state);

  const [displayName, setDisplayeName] = useState(loggedInUser.displayName);
  const [profilePicture, setProfilePicture] = useState(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dob, setDob] = useState(
    loggedInUser?.dateOfBirth
      ? loggedInUser?.dateOfBirth
      : moment().subtract(10, "year").unix()
  );
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(loggedInUser.gender);

  const dispatch = useDispatch();

  const handleInputText = (label, value) => {
    setDisplayeName(value);
  };

  const openImageLibrary = async () => {
    setShowImagePicker(false);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1,
      });
      setProfilePicture(result?.assets[0]?.uri);
    } catch (error) {
      console.error(error);
    }
  };

  const onDateChange = (date) => {
    setShowDatePicker(Platform.OS == "ios");
    setDob(moment(date).unix());
  };

  const openCameraLibrary = async () => {
    setShowImagePicker(false);
    try {
      const result = await ImagePicker.launchCameraAsync({
        saveToPhotos: false,
        mediaType: "photo",
        includeBase64: false,
      });
      setProfilePicture(result?.assets[0]?.uri);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    if (profilePicture === null) {
      setLoading(true);
      const payload = {
        uid: loggedInUser.uid,
        profileUrl: loggedInUser?.profilePicture || null,
        gender: selectedId,
        dateOfBirth: dob,
        displayName: displayName,
      };
      dispatch(handleUpdateProfile(payload)).then((rr) => {
        setLoading(false);
        showMessage({
          message: "Success",
          description: "Profile updated successfully",
          type: "success",
          duration: 3000, // 3 seconds
          floating: true,
        });
      });
      return;
    }
    setLoading(true);

    fetch(profilePicture)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        response.blob().then((blob) => {
          const storage = getStorage(app);
          const storageRef = ref(
            storage,
            `profile_picture/${loggedInUser.uid}`
          );
          uploadBytes(storageRef, blob)
            .then((uploadResult) => {
              getDownloadURL(storageRef).then((downloadURL) => {
                const payload = {
                  uid: loggedInUser.uid,
                  profileUrl: downloadURL,
                  gender: selectedId,
                  dateOfBirth: dob,
                  displayName: displayName,
                };
                dispatch(handleUpdateProfile(payload)).then((rr) => {
                  setLoading(false);
                  showMessage({
                    message: "Success",
                    description: "Profile updated successfully",
                    type: "success",
                    duration: 3000, // 3 seconds
                    floating: true,
                  });
                });
              });
            })
            .catch((err) => {
              setLoading(false);
            });
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log("error in fethching profile");
      });
  };

  const radioButtons = useMemo(
    () => [
      {
        id: "1",
        label: "Male",
        value: "Male",
      },
      {
        id: "2",
        label: "Female",
        value: "Female",
      },
    ],
    []
  );
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#f3eaff",
      }}
    >
      <StatusBar />
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
              profilePicture
                ? {
                    uri: profilePicture,
                  }
                : loggedInUser.profilePicture
                ? {
                    uri: loggedInUser.profilePicture,
                  }
                : require("../assets/avatar.jpg")
            }
          />
          <View
            style={{
              position: "absolute",
              bottom: 10,
              left: 235,
              padding: 10,
              backgroundColor: "#dbd3ba",
              borderRadius: 40,
              height: 35,
              width: 35,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
                backgroundColor: "#1581ed",
                borderRadius: 20,
                height: 30,
                width: 30,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
              onPress={() => setShowImagePicker(true)}
            >
              <Foundation name="plus" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            marginTop: 32,
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
          }}
        ></View>
        <View style={[styles.sectionContainer, { marginTop: 20 }]}>
          <TextScreen
            label="Name"
            handleInputText={handleInputText}
            value={displayName}
            keyboardType="default"
          />
          <View
            style={{
              width: wp2dp(85),
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                alignContent: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedId}
                selectedId={selectedId}
                containerStyle={{
                  display: "flex",
                  flexDirection: "row",
                  padding: 0,
                }}
              />
            </View>

            <View
              style={{
                alignContent: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{
                  height: 40,
                  width: wp2dp(39),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: "#bdbdbd",
                  borderRadius: 5,
                }}
              >
                <Text>{moment.unix(dob).format("DD-MM-YYYY")}</Text>
                {showDatePicker && (
                  <DatePicker
                    value={dob}
                    isVisible={showDatePicker}
                    onClose={() => setShowDatePicker(false)}
                    onDateChange={onDateChange}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <TextScreen
            editable={false}
            label="Username / Email"
            handleInputText={handleInputText}
            value={loggedInUser.email}
            keyboardType="email-address"
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
            <TouchableOpacity onPress={uploadImage} style={styles.loginButton}>
              <Text style={{ fontSize: 18, color: "white", fontWeight: "700" }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ImagePickerModal
          isVisible={showImagePicker}
          openCameraLibrary={openCameraLibrary}
          openImageLibrary={openImageLibrary}
          onClose={() => setShowImagePicker(false)}
        />
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
