import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import {
  CommonActions,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "../../Routes";
import styles from "./SplashPageStyles";

type SplashRouteProp = RouteProp<
  RootStackParamList & { Splash: { nextRoute?: "Login" | "Main" } },
  "Splash"
>;

const logo = require("../../assets/images/logoEventosUB.png");

const SplashPage = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const route = useRoute<SplashRouteProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextRoute = route.params?.nextRoute || "Login";

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: nextRoute }],
        })
      );
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation, route.params?.nextRoute]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
      </View>

      <Text style={styles.title}>EventosUB</Text>
      <Text style={styles.subtitle}>
        Descubre, guarda y comparte los eventos de tu universidad.
      </Text>
    </View>
  );
};

export default SplashPage;