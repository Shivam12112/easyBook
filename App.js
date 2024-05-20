import React from "react";
import { View } from "react-native";
import Navigation from "./Navigation";
import { WithSplashScreen } from "./WithSplashScreen";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <WithSplashScreen isAppReady={true}>
        <Navigation />
      </WithSplashScreen>
    </Provider>
  );
};

export default App;
