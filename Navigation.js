import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { useSelector } from "react-redux";
import HomeScreen from "./Components/HomeScreen";
import LoginScreen from "./Components/LoginScreen";
import SignupScreen from "./Components/SignupScreen";
import ViewBook from "./Components/ViewBook";
import TabView from "./Components/TabView";
import TabViewScreen from "./Components/TabView";
import Profile from "./Components/Profile";
import OnboardingScreen from "./Components/OnboardingScreen";

const Stack = createStackNavigator();

function Navigation() {
  const { loggedInUser, headerShown, onboardingScreen } = useSelector(
    (state) => state
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          Object.keys(loggedInUser)?.length
            ? "TabViewScreen"
            : onboardingScreen
            ? "OnboardingScreen"
            : "LoginScreen"
        }
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS, // Use default slide from right transition
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen
          name="OnboardingScreen"
          component={OnboardingScreen}
          options={{ title: "", header: () => null }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ title: "", header: () => null, gestureEnabled: false }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{ title: "", header: () => null, gestureEnabled: false }}
        />
        <Stack.Screen
          name="TabViewScreen"
          component={TabViewScreen}
          options={{
            title: "",
            headerShown: false,
            headerStyle: { backgroundColor: "#DE7773" },
            headerTintColor: "#fff",
            gestureEnabled: true,
            ...TransitionPresets.ModalSlideFromBottomIOS, // Custom transition for this screen
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "Profile",
            headerShown: true,
            headerShadowVisible: true,
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: "#DE7773" },
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            gestureEnabled: true,
            ...TransitionPresets.ModalSlideFromBottomIOS, // Custom transition for this screen
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Home Screen",
            header: () => null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="ViewBook"
          component={ViewBook}
          options={{
            title: "View Book",
            headerShown: true,
            headerShadowVisible: true,
            headerBackTitleVisible: false,
            headerStyle: { backgroundColor: "#DE7773" },
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            gestureEnabled: true,
            ...TransitionPresets.ModalSlideFromBottomIOS, // Custom transition for this screen
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
