export type InterestCategory = "academico" | "cultural" | "deportivo" | "social";

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Onboarding: undefined;
  Main: undefined;
};

export type MainStackParamList = {
  Tabs: undefined;
  EventDetail: {
    eventId: number;
  };
  EditEvent: {
    eventId: number;
  };
  AttendanceSuccess: {
    eventId: number;
  };
};

export type BottomTabParamList = {
  HomeTab: undefined;
  SearchTab: undefined;
  CreateTab: undefined;
  NotificationsTab: undefined;
  ProfileTab: undefined;
};