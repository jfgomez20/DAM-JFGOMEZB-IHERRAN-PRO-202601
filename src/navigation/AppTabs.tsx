import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text } from "react-native";

import { BottomTabParamList } from "../Routes";
import {
  CreateEventPage,
  HomePage,
  NotificationsPage,
  ProfilePage,
  SearchPage,
} from "../screens";
import { COLORS, FONTS } from "../core/config";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarLabelStyle: {
          fontFamily: FONTS.bold,
          fontSize: 11,
          marginBottom: 4,
        },
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          backgroundColor: COLORS.white,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomePage}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>🏠</Text>
          ),
        }}
      />

      <Tab.Screen
        name="SearchTab"
        component={SearchPage}
        options={{
          title: "Buscar",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>🔎</Text>
          ),
        }}
      />

      <Tab.Screen
        name="CreateTab"
        component={CreateEventPage}
        options={{
          title: "Crear",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>➕</Text>
          ),
        }}
      />

      <Tab.Screen
        name="NotificationsTab"
        component={NotificationsPage}
        options={{
          title: "Avisos",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>🔔</Text>
          ),
        }}
      />

      <Tab.Screen
        name="ProfileTab"
        component={ProfilePage}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabs;