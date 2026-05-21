import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background },
  text: { fontSize: theme.fonts.sizes.xl, color: theme.colors.text },
});

export default Profile;
