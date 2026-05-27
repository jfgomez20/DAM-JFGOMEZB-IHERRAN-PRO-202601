import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./TextLinkStyles";

interface TextLinkProps {
  text: string;
  onPress?: () => void;
}

const TextLink = ({ text, onPress }: TextLinkProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default TextLink;