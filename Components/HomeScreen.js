import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  BackHandler,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useDispatch, useSelector } from "react-redux";
import imageBackground from "../assets/backGround.png";
import { handleFetchBookByName } from "../redux/slices";
import BookFlatList from "./BookFlatList";
import Loader from "./Loader";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const { books, loading } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleTextChange = (text) => {
    setSearch(text);
  };

  const handleBookSearch = () => {
    if (search) {
      dispatch(handleFetchBookByName(search)).then(() => setSearch(""));
    } else {
      Alert.alert("Alert!", "Please enter the book name.");
    }
  };

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
  useEffect(() => {
    if (!Object.keys(books).length) dispatch(handleFetchBookByName(search));
  }, []);

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
          marginTop: 40,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 25,
            borderRadius: 5,
          }}
        >
          <View
            style={{
              flex: 3,
              marginRight: 10,
            }}
          >
            <TextInput
              onChangeText={handleTextChange}
              onBlur={() => setSearch("")}
              style={{
                height: 40,
                borderRadius: 5,
                backgroundColor: `white`,
                paddingHorizontal: 8,
              }}
              value={search}
              placeholder="search here..."
            />
          </View>
          <View
            style={{
              flex: 1,
            }}
          >
            <TouchableOpacity
              onPress={handleBookSearch}
              style={{
                backgroundColor: "#DE7773",
                height: 40,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingBottom: 20,
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
        {loading && <Loader loading={loading} />}
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;
