import { useFocusEffect } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import {
  Alert,
  BackHandler,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { widthPercentageToDP as wp2dp } from "react-native-responsive-screen";
import { ScrollView } from "react-native-virtualized-view";
import { useSelector } from "react-redux";
import imageBackground from "../assets/backGround.png";
import BookFlatList from "./BookFlatList";
import Loader from "./Loader";
import SearchBook from "./SearchBook";

const HomeScreen = () => {
  const { books, loading } = useSelector((state) => state);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert(
          "Hold on!",
          "Are you sure you want to exit the application?",
          [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel",
            },
            { text: "YES", onPress: () => BackHandler.exitApp() },
          ]
        );
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    })
  );

  return (
    <ImageBackground
      source={imageBackground}
      style={{
        backgroundColor: "gray",
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View
          style={{
            marginTop: 25,
            paddingHorizontal: 16,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <SearchBook />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 20,
            borderRadius: 5,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Popular Books
          </Text>
        </View>
        {books?.items?.length ? (
          <ScrollView>
            <View
              style={{
                paddingHorizontal: 16,
                paddingBottom: 10,
              }}
            >
              <BookFlatList data={books?.items} />
            </View>
          </ScrollView>
        ) : (
          <View style={styles.textContainer}>
            <Text
              style={{
                color: "white",
              }}
            >
              Nothing to show!
            </Text>
          </View>
        )}
        {loading && <Loader loading={loading} />}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bgimage: {
    flex: 1,
    paddingHorizontal: wp2dp("2.5"),
    paddingBottom: 20,
  },
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingTop: Platform?.OS == "ios" ? 5 : null,
  },

  textContainer: {
    top: "45%",
    justifyContent: "center",
    alignItems: "center",
  },
});
