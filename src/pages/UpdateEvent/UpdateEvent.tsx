import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

const UpdateEvent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>UpdateEvent</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background },
  text: { fontSize: theme.fonts.sizes.xl, color: theme.colors.text },
});

export default UpdateEvent;
