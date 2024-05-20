import React from "react";
import { StyleSheet } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Components/HomeScreen";
import LoginScreen from "./Components/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";

import ViewBook from "./Components/ViewBook";

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer id="navigation_container_id">
      <Stack.Navigator
        id="stack_navigator_id"
        options={{
          animationTypeForReplace: "push",
        }}
        screenOptions={{
          animation: "slide_from_bottom",
          animationTypeForReplace: "push",
        }}
        initialRouteName={"HomeScreen"}
      >
        <Stack.Screen
          intialRender="false"
          name="LoginScreen"
          options={{ title: "", header: () => null }}
          component={LoginScreen}
          id="login_screen_id"
        />
        <Stack.Screen
          intialRender="true"
          name="homeScreen"
          options={{
            title: "Home Screen",
            header: () => null,
            gestureEnabled: false,
          }}
          component={HomeScreen}
          id="homeScreen"
        />
        <Stack.Screen
          intialRender="false"
          name="viewBook"
          options={{
            title: "View Book",
            headerShadowVisible: true,
            headerBackTitleVisible: false,
            headerBackgroundContainerStyle: "background",
            headerStyle: { backgroundColor: "#171B36" },
            headerTitleAlign: "center",
            headerTintColor: "#fff",
            // header: () => null,
          }}
          component={ViewBook}
          id="viewBook"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
