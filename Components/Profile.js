import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { auth } from "../authentication/firebaseConfig";
import { persistor } from "../redux/store";

const profiles = [
  {
    id: "1",
    username: "johndoe1",
    avatar:
      "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
  },
  {
    id: "2",
    username: "johndoe2",
    avatar:
      "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
  },
  {
    id: "3",
    username: "johndoe3",
    avatar:
      "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
  },
];

const Profile = () => {
  const { loggedInUser } = useSelector((state) => state);
  const navigation = useNavigation();


  const handleLogOut = () => {
    auth.signOut();
    persistor.purge();
    navigation.replace("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745",
          }}
          style={styles.mainAvatar}
        />
        <Text style={styles.mainName}>{loggedInUser.displayName}</Text>
      </View>
      {/* <FlatList
        data={profiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.profileItem}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.username}>{item.username}</Text>
          </View>
        )}
      /> */}
      <View style={styles.profileItem}>
        <Image source={{ uri: profiles[0].avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.username}>{"Name"}</Text>
          <Text style={styles.username}>{loggedInUser.displayName}</Text>
        </View>
      </View>
      <View style={styles.profileItem}>
        <Image source={{ uri: profiles[0].avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.username}>{"Email"}</Text>
          <Text style={styles.username}>{loggedInUser.email}</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          paddingVertical: 20,
        }}
      >
        <TouchableOpacity
          onPress={handleLogOut}
          style={{
            backgroundColor: "#DE7773",
            height: 40,
            paddingHorizontal: 20,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3eaff",
  },
  header: {
    backgroundColor: "#DE7773",
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 20,
  },
  mainAvatar: {
    width: 100,
    height: 100,
    borderRadius: 40,
    paddingTop: 20,
  },
  mainName: {
    marginTop: 10,
    fontSize: 24,
    color: "white",
  },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 18,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  username: {
    fontSize: 18,
  },
});

export default Profile;
