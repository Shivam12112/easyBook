import React from "react";
import { View } from "react-native";
import Navigation from "./Navigation";
import { WithSplashScreen } from "./WithSplashScreen";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { Provider, useSelector } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WithSplashScreen isAppReady={true}>
          <Navigation />
        </WithSplashScreen>
      </PersistGate>
    </Provider>
  );
};

export default App;
