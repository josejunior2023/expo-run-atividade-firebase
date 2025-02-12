import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext"; // Importando o contexto de tema

export default function Loading() {
  const { colors } = useTheme(); // Obtendo as cores do tema

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
    >
      <ActivityIndicator color={colors.textColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
