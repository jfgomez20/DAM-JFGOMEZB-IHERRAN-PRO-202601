import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootStackParamList } from "./Routes";
import { LoginPage, RegisterPage, SplashPage, OnboardingPage } from "./screens";
import { setupDatabase } from "./core/config";
import AuthService from "./core/services/AuthService/AuthService";
import EventService from "./core/services/EventService/EventService";
import { COLORS } from "./core/config";
import { AppProvider } from "./context/AppContext";
import MainStack from "./navigation/MainStack";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  const [appReady, setAppReady] = useState(false);
  const [initialAuthRoute, setInitialAuthRoute] =
    useState<"Login" | "Main">("Login");

  useEffect(() => {
    const bootstrap = async () => {
      try {
        setupDatabase();

        EventService.seedDefaultEvents();
        EventService.deleteExpiredEvents();

        const session = await AuthService.getSession();

        if (session) {
          setInitialAuthRoute("Main");
        } else {
          setInitialAuthRoute("Login");
        }
      } catch (error) {
        console.error("Error verificando sesión:", error);
        setInitialAuthRoute("Login");
      } finally {
        setAppReady(true);
      }
    };

    bootstrap();
  }, []);

  if (!appReady) {
    return (
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.background,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
              contentStyle: {
                backgroundColor: COLORS.background,
              },
            }}
          >
            <Stack.Screen
              name="Splash"
              component={SplashPage}
              initialParams={{ nextRoute: initialAuthRoute }}
            />

            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={RegisterPage} />
            <Stack.Screen name="Onboarding" component={OnboardingPage} />
            <Stack.Screen name="Main" component={MainStack} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
};

export default App;