import React from "react";
import { SafeAreaView } from "react-native";
import styles from "./MainTemplateStyles";

interface MainTemplateProps {
  children: React.ReactNode;
}

const MainTemplate = ({ children }: MainTemplateProps) => {
  return <SafeAreaView style={styles.safe}>{children}</SafeAreaView>;
};

export default MainTemplate;