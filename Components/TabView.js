import { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import { actions, handleHeaderShown } from "../redux/slices";
import HomeScreen from "./HomeScreen";
import Profile from "./Profile";

const FirstRoute = () => <HomeScreen />;
const SecondRoute = () => <Profile />;

export default function TabViewScreen({ navigation }) {
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state);
  const [index, setIndex] = useState(0);
  const [routes] = useState([{ key: "first" }, { key: "second" }]);
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        activeColor={"white"}
        inactiveColor={"white"}
        indicatorStyle={{ backgroundColor: "#fcfcfc" }}
        style={{ backgroundColor: "#DE7773", activeColor: "black" }}
        renderIcon={(props) => getTabBarIcon(props)}
      ></TabBar>
    );
  };

  const getTabBarIcon = ({ route }) => {
    if (route.key === "first") {
      return (
        <View style={{ display: "flex", flexDirection: "row" }}>
          <FontAwesome name="book" style={{ color: "white" }} size={30} />
        </View>
      );
    } else {
      return (
        <View style={{ display: "flex", flexDirection: "row" }}>
          {/* <MaterialCommunityIcons
            style={{ color: "white" }}
            name="briefcase-account"
            size={24}
          /> */}
          <FontAwesome
            name="user-circle-o"
            style={{ color: "white" }}
            size={30}
          />
        </View>
      );
    }
  };

  if (index) {
    dispatch(handleHeaderShown(true));
    navigation.setOptions({
      title: loggedInUser.displayName,
    });
  } else {
    navigation.setOptions({
      title: "",
      headerRight: () => null,
    });
    dispatch(handleHeaderShown(false));
  }

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      tabBarPosition="bottom"
    />
  );
}

const styles = StyleSheet.create({
  headerRight: {
    color: "white",
    marginRight: 16,
  },
});
