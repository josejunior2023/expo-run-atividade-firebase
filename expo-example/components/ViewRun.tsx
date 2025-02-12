import { useRouter } from "expo-router";
import { Alert, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import Run from "../types/Run";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface ViewRunProps {
  run: Run;
  onDelete: () => Promise<void>;
}

export default function ViewRun({ run, onDelete }: ViewRunProps) {
  const router = useRouter();
  const { toggleTheme, theme, colors } = useTheme(); // Obtendo as cores do tema

  const handleDelete = () => {
    Alert.alert("Confirmação", "Tem certeza que deseja excluir esta corrida?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: onDelete },
    ]);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
    >
      <Text style={[styles.title, { color: colors.textColor }]}>
        Detalhes da Corrida
      </Text>

      <View style={styles.detailContainer}>
        <View style={styles.detailRow}>
          <Icon name="map-marker-distance" size={20} color={colors.textColor} />
          <Text style={[styles.detailText, { color: colors.textColor }]}>
            Distância: {run.distance.toFixed(2)} km
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="speedometer" size={20} color={colors.textColor} />
          <Text style={[styles.detailText, { color: colors.textColor }]}>
            Velocidade Média: {run.avgSpeed.toFixed(2)} km/h
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="clock" size={20} color={colors.textColor} />
          <Text style={[styles.detailText, { color: colors.textColor }]}>
            Horário: {run.time}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: colors.primaryButtonColor },
          ]}
          onPress={handleDelete}
        >
          <Text style={[styles.buttonText, { color: colors.textColor }]}>
            Excluir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 12,
    margin: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  detailContainer: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
