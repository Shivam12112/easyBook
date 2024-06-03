import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { widthPercentageToDP as wp2dp } from "react-native-responsive-screen";

const TextScreen = ({
  label,
  secureTextEntry,
  keyboardType,
  handleInputText,
  value,
  placeholder,
}) => {
  const onChangeText = (text) => {
    handleInputText(label, text);
  };

  return (
    // <View style={styles.container}>
    //   <Animated.View style={[styles.animatedStyle, animStyle]}>
    //     <Text style={styles.label}>{label}</Text>
    //   </Animated.View>
    //   <TextInput
    //     autoCapitalize={"none"}
    //     style={styles.input}
    //     keyboardType={keyboardType ? keyboardType : ""}
    //     secureTextEntry={secureTextEntry}
    //     value={value}
    //     onChangeText={(text) => onChangeText(text)}
    //     editable={true}
    //     onFocus={onFocusHandler}
    //     onBlur={onBlurHandler}
    //     blurOnSubmit
    //   />
    // </View>
    <View
      style={{
        marginTop: 10,
      }}
    >
      {/* <Text
        style={{
          color: "gray",
          marginBottom: 5,
          paddingHorizontal: 5,
        }}
      >
        {label}
      </Text> */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={{
            paddingHorizontal: 10,
            height: 40,
            borderColor: "#bdbdbd",
            width: wp2dp(85),
            borderRadius: 5,
            borderWidth: 1,
          }}
          name="Email"
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={(text) => onChangeText(text)}
          placeholder={label}
          autoCapitalize={false}
          keyboardType={keyboardType ? keyboardType : ""}
          // onBlur={validateLogin}
        />
      </View>
    </View>
  );
};
export default TextScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    // backgroundColor: "#fff",
    paddingTop: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#bdbdbd",
    width: wp2dp(85),
    alignSelf: "center",
  },
  icon: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    borderWidth: 0,
    fontSize: 13,
    height: 35,
    color: "#000",
  },
  label: {
    color: "grey",
    fontSize: 14,
  },
  animatedStyle: {
    top: 5,
    paddingHorizontal: 10,
    position: "absolute",
    // borderRadius: 90,
    zIndex: 10000,
  },
});
