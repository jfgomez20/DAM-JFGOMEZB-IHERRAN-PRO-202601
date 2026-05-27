import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MainStackParamList } from "../Routes";
import AppTabs from "./AppTabs";
import {
  AttendanceSuccessPage,
  EditEventPage,
  EventDetailPage,
} from "../screens";
import { COLORS, FONTS } from "../core/config";

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Tabs"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerTintColor: COLORS.primary,
        headerTitleStyle: {
          fontFamily: FONTS.bold,
        },
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Stack.Screen
        name="Tabs"
        component={AppTabs}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="EventDetail"
        component={EventDetailPage}
        options={{
          title: "Detalle del evento",
        }}
      />

      <Stack.Screen
        name="AttendanceSuccess"
        component={AttendanceSuccessPage}
        options={{
          title: "Asistencia confirmada",
        }}
      />

      <Stack.Screen
        name="EditEvent"
        component={EditEventPage}
        options={{
          title: "Editar evento",
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;