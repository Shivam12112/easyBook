import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import React from "react";
import { useSelector } from "react-redux";
import ForgetPasswordScreen from "./Components/ForgetPasswordScreen";
import HomeScreen from "./Components/HomeScreen";
import LoginScreen from "./Components/LoginScreen";
import OnboardingScreen from "./Components/OnboardingScreen";
import Profile from "./Components/Profile";
import SignupScreen from "./Components/SignupScreen";
import TabViewScreen from "./Components/TabView";
import ViewBook from "./Components/ViewBook";
import EditProfile from "./Components/EditProfile";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const Stack = createStackNavigator();

function Navigation() {
  const { loggedInUser, headerShown, onboardingScreen } = useSelector(
    (state) => state
  );

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            loggedInUser.uid
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
            options={{ title: "", headerShown: false, gestureEnabled: true }}
          />
          <Stack.Screen
            name="ForgetPasswordScreen"
            component={ForgetPasswordScreen}
            options={{ title: "", headerShown: false, gestureEnabled: true }}
          />
          <Stack.Screen
            name="TabViewScreen"
            component={TabViewScreen}
            options={{
              title: "TabViewScreen",
              headerShown: true,
              headerRight: () => (
                <View style={{ paddingHorizontal: 10 }}>
                  <TextInput
                    // onChangeText={handleTextChange}
                    onBlur={() => setSearch("")}
                    style={{
                      height: 40,
                      borderRadius: 5,
                      backgroundColor: `white`,
                      paddingHorizontal: 8,
                    }}
                    // value={search}
                    placeholder="search here..."
                  />
                </View>
              ),
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
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              title: "Edit Profile",
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
    </>
  );
}

export default Navigation;
