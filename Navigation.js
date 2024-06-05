import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import EditProfile from "./Components/EditProfile";
import ForgetPasswordScreen from "./Components/ForgetPasswordScreen";
import HomeScreen from "./Components/HomeScreen";
import LoginScreen from "./Components/LoginScreen";
import OnboardingScreen from "./Components/OnboardingScreen";
import Profile from "./Components/Profile";
import SignupScreen from "./Components/SignupScreen";
import ViewBook from "./Components/ViewBook";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { widthPercentageToDP as wp2dp } from "react-native-responsive-screen";
import LogOut from "./Components/LogOut";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Navigation() {
  const { loggedInUser, onboardingScreen } = useSelector((state) => state);

  const NavigationDrawer = ({ navigation }) => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#DE7773",
        }}
        initialRouteName="Home"
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
            headerTintColor: "white",
            headerTitle: "Profile",
            headerStyle: {
              backgroundColor: "#DE7773",
            },
            headerRight: () => (
              <View
                style={{
                  paddingRight: 18,
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("EditProfile")}
                >
                  <AntDesign name="edit" size={24} color="white" />
                </TouchableOpacity>
              </View>
            ),
          }}
          component={Profile}
        />
        <Tab.Screen
          name="LogOut"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="logout" size={size} color={color} />
            ),
            headerTintColor: "white",
            headerTitle: "",
            headerStyle: {
              backgroundColor: "#DE7773",
            },
          }}
          component={LogOut}
        />
      </Tab.Navigator>
    );
  };

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            loggedInUser.uid
              ? "HomeScreen"
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
            name="HomeScreen"
            component={NavigationDrawer}
            options={{ title: "", gestureEnabled: true }}
          />

          <Stack.Screen
            name="ViewBook"
            component={ViewBook}
            options={{
              title: "View Book",
              headerShown: true,
              headerShadowVisible: true,
              headerBackTitleVisible: false,
              headerStyle: {
                backgroundColor: "#DE7773",
              },
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
              headerStyle: {
                backgroundColor: "#DE7773",
              },
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

const styles = StyleSheet.create({
  headerRight: {
    color: "white",
    marginRight: 16,
  },
  editProfileRoot: {
    marginTop: 10,
    width: wp2dp("35%"),
  },
  editProfile: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#4facf7",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});
