import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchBookByName } from "../redux/slices";
import Loader from "./Loader";

const SearchBook = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state);
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

  return (
    <View>
      <Loader loading={loading} />
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: `white`,
          borderRadius: 5,
          width: widthPercentageToDP(90),
        }}
      >
        <TextInput
          onChangeText={(text) => handleTextChange(text)}
          style={{
            height: 40,
            width: widthPercentageToDP(80),
            borderRadius: 5,
            backgroundColor: `white`,
            paddingHorizontal: 8,
          }}
          value={search}
          placeholder="search here..."
        />
        <TouchableOpacity onPress={handleBookSearch}>
          <Ionicons name="search" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchBook;
