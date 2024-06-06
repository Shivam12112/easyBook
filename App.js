import { StatusBar } from "expo-status-bar";
import React from "react";
import { LogBox } from "react-native";
import FlashMessage from "react-native-flash-message";
import "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Navigation from "./Navigation";
import { WithSplashScreen } from "./WithSplashScreen";
import { persistor, store } from "./redux/store";

const App = () => {
  LogBox.ignoreLogs([
    "Selector unknown returned the root state when called. This can lead to unnecessary rerenders.",
    "Warning: Cannot update a component (`StackNavigator`) while rendering a different component (`TabViewScreen`). To locate the bad setState() call inside `TabViewScreen`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render",
  ]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <WithSplashScreen isAppReady={true}>
          <PaperProvider>
            <StatusBar style="auto" hidden={false} />
            <Navigation />
          </PaperProvider>
        </WithSplashScreen>
        <FlashMessage style={{ marginTop: 10 }} position="top" />
      </PersistGate>
    </Provider>
  );
};

export default App;
