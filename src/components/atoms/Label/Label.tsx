import React from "react";
import { Text } from "react-native";
import styles from "./LabelStyles";

interface LabelProps {
    text: string;
}

const Label = ({ text }: LabelProps) => {
    return <Text style={styles.label}>{text}</Text>;
};

export default Label;