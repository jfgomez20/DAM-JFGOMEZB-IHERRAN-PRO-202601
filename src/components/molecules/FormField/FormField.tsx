import React from "react";
import { Text, TextInputProps, View } from "react-native";
import { Input } from "../../atoms";
import styles from "./FormFieldStyles";

interface FormFieldProps extends TextInputProps {
  label: string;
  secure?: boolean;
}

const FormField = ({ label, secure = false, ...props }: FormFieldProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Input secure={secure} {...props} />
    </View>
  );
};

export default FormField;