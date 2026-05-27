import React, { useState } from "react";
import {
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import styles from "./InputStyles";

interface InputProps extends TextInputProps {
  secure?: boolean;
}

const Input = ({ secure = false, ...props }: InputProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#B8A0A0"
        secureTextEntry={secure && !visible}
        {...props}
      />

      {secure && (
        <TouchableOpacity onPress={() => setVisible(!visible)}>
          <Text style={styles.eye}>{visible ? "Ocultar" : "Ver"}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;