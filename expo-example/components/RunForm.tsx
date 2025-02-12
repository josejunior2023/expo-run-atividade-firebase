import { useState, useCallback } from "react";
import {
  Alert,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import Run from "../types/Run";
import { useTheme } from "../contexts/ThemeContext"; // Hook para acessar o tema

interface RunFormProps {
  onSubmit: (run: Run) => void;
}

export default function RunForm({ onSubmit }: RunFormProps) {
  const [distance, setDistance] = useState("");
  const [avgSpeed, setAvgSpeed] = useState("");
  const [time, setTime] = useState("");
  const { colors, theme } = useTheme(); // Acessando as cores do tema

  const handleSubmit = useCallback(() => {
    // Validação dos campos
    if (!distance || !avgSpeed || !time) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Validação de número válido para distância e velocidade média
    const distanceValue = parseFloat(distance);
    const avgSpeedValue = parseFloat(avgSpeed);

    if (isNaN(distanceValue) || isNaN(avgSpeedValue)) {
      Alert.alert(
        "Erro",
        "Por favor, insira valores válidos para distância e velocidade."
      );
      return;
    }

    // Validação do formato do horário (hh:mm)
    const timeParts = time.split(":");
    if (
      timeParts.length !== 2 ||
      timeParts[0].length !== 2 ||
      timeParts[1].length !== 2
    ) {
      Alert.alert("Erro", "O horário deve ser no formato hh:mm.");
      return;
    }

    const newRun: Run = {
      distance: distanceValue,
      avgSpeed: avgSpeedValue,
      time,
    };

    // Chama a função de submit
    onSubmit(newRun);

    // Limpa os campos após o envio
    setDistance("");
    setAvgSpeed("");
    setTime("");
  }, [distance, avgSpeed, time, onSubmit]);

  return (
    <View style={[styles.form, { backgroundColor: colors.backgroundColor }]}>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.inputBackground, color: colors.textColor },
        ]}
        placeholder="Distância (km)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.inputBackground, color: colors.textColor },
        ]}
        placeholder="Velocidade Média (km/h)"
        keyboardType="numeric"
        value={avgSpeed}
        onChangeText={setAvgSpeed}
      />
      <TextInput
        style={[
          styles.input,
          { backgroundColor: colors.inputBackground, color: colors.textColor },
        ]}
        placeholder="Horário (hh:mm)"
        value={time}
        onChangeText={setTime}
      />
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primaryButtonColor }]}
        onPress={handleSubmit}
      >
        <Text
          style={[
            styles.buttonText,
            { color: theme === "light" ? "#000000" : colors.buttonTextColor }, // Texto preto no modo claro
          ]}
        >
          Adicionar Corrida
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
    margin: 8,
  },
  input: {
    height: 50,
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
