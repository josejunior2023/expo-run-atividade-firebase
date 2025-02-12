import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useTheme } from "../../contexts/ThemeContext"; // Importando o contexto de tema

export default function DefaultLayout() {
  const { colors } = useTheme(); // Obtendo as cores do tema atual

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
    >
      <Stack />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
