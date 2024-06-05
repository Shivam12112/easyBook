import React from "react";
import { Platform, SafeAreaView, StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Modal, Portal } from "react-native-paper";
import { heightPercentageToDP } from "react-native-responsive-screen";

const DatePicker = ({
  isVisible,
  onClose,
  openImageLibrary,
  value,
  onDateChange,
}) => {
  return (
    <Portal>
      <Modal visible={isVisible} onDismiss={onClose}>
        <SafeAreaView
          style={[
            styles.buttons,
            Platform.OS == "ios" && { backgroundColor: "white" },
          ]}
        >
          <View style={styles.button} onPress={openImageLibrary}>
            <DateTimePicker
              testID="dateTimePicker"
              value={new Date(moment.unix(value))}
              mode={"date"}
              is24Hour={true}
              display="spinner"
              maximumDate={new Date(moment().subtract(10, "year"))}
              onChange={(e, date) => {
                onDateChange(date);
              }}
            />
          </View>
        </SafeAreaView>
      </Modal>
    </Portal>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  buttonIcon: {
    width: 55,
    height: 55,
    margin: 10,
  },
  buttons: {
    height: heightPercentageToDP(20),
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
