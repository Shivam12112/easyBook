import React from 'react';
import {StyleSheet} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './Components/HomeScreen';
import LoginScreen from './Components/LoginScreen';
import ViewBook from './Components/ViewBook';
import SignupScreen from './Components/SignupScreen';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS, // Use default slide from right transition
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{title: '', header: () => null}}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{title: '', header: () => null, gestureEnabled: false}}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'Home Screen',
            header: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="ViewBook"
          component={ViewBook}
          options={{
            title: 'View Book',
            headerShown: true,
            headerShadowVisible: true,
            headerBackTitleVisible: false,
            headerStyle: {backgroundColor: '#171B36'},
            headerTitleAlign: 'center',
            headerTintColor: '#fff',
            gestureEnabled: true,
            ...TransitionPresets.ModalSlideFromBottomIOS, // Custom transition for this screen
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
