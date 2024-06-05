import React from "react";
import {
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
// import { Portal } from "react-native-paper";
import { Modal, Portal } from "react-native-paper";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { heightPercentageToDP } from "react-native-responsive-screen";

const ImagePickerModal = ({
  isVisible,
  onClose,
  openImageLibrary,
  openCameraLibrary,
}) => {
  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={onClose}>
        <SafeAreaView style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={openImageLibrary}>
            <Ionicons name="image-sharp" size={40} color="#DE7773" />
            <Text style={styles.buttonText}>Library</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={openCameraLibrary}>
            <AntDesign name="camera" size={40} color="#DE7773" />
            <Text style={styles.buttonText}>Camera</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </Portal>
  );
};

export default ImagePickerModal;

const styles = StyleSheet.create({
  buttonIcon: {
    width: 55,
    height: 55,
    margin: 10,
  },
  buttons: {
    height: heightPercentageToDP(20),
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 10,
    marginHorizontal: 50,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "black",
  },
});
