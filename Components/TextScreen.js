import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Animated,
  Pressable,
} from 'react-native';
import {
  heightPercentageToDP as hp2dp,
  widthPercentageToDP as wp2dp,
} from 'react-native-responsive-screen';

const TextScreen = ({label, secureTextEntry, keyboardType}) => {
  const [value, setValue] = useState('');
  const moveText = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value !== '') {
      moveTextTop();
    } else if (value === '') {
      moveTextBottom();
    }
  }, [value]);

  const onChangeText = text => {
    setValue(text);
  };

  const onFocusHandler = () => {
    // if (value !== '') {
    moveTextTop();
    // }
  };

  const onBlurHandler = () => {
    if (value === '') {
      moveTextBottom();
    }
  };

  const moveTextTop = () => {
    Animated.timing(moveText, {
      toValue: 0.6,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveTextBottom = () => {
    Animated.timing(moveText, {
      toValue: -0.2,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const yVal = moveText.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -20],
  });

  const animStyle = {
    transform: [
      {
        translateY: yVal,
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedStyle, animStyle]}>
        <Text style={styles.label}>{label}</Text>
      </Animated.View>
      <TextInput
        autoCapitalize={'none'}
        style={styles.input}
        keyboardType={keyboardType ? keyboardType : ''}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={text => onChangeText(text)}
        editable={true}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
        blurOnSubmit
      />
    </View>
  );
};
export default TextScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#fff',
    paddingTop: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderColor: '#bdbdbd',
    width: wp2dp(85),
    alignSelf: 'center',
  },
  icon: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 0,
    fontSize: 13,
    height: 35,
    color: '#000',
  },
  label: {
    color: 'grey',
    fontSize: 14,
  },
  animatedStyle: {
    top: 5,
    paddingHorizontal: 10,
    position: 'absolute',
    // borderRadius: 90,
    zIndex: 10000,
  },
});
