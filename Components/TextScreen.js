import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { widthPercentageToDP as wp2dp } from "react-native-responsive-screen";

const TextScreen = ({
  label,
  secureTextEntry,
  keyboardType,
  handleInputText,
  value,
  editable,
}) => {
  const onChangeText = (text) => {
    handleInputText(label, text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TextInput
          style={styles.input}
          editable={editable}
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={(text) => onChangeText(text)}
          placeholder={label}
          autoCapitalize={false}
          keyboardType={keyboardType ? keyboardType : ""}
        />
      </View>
    </View>
  );
};
export default TextScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 10,
    height: 45,
    borderColor: "#bdbdbd",
    width: wp2dp(85),
    borderRadius: 5,
    borderWidth: 1,
  },
});
