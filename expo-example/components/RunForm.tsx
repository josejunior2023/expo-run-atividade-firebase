import { useState } from "react";
import {
  Alert,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import Run from "../types/Run";

interface RunFormProps {
  onSubmit: (run: Run) => void;
}

export default function RunForm({ onSubmit }: RunFormProps) {
  const [distance, setDistance] = useState("");
  const [avgSpeed, setAvgSpeed] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    if (!distance || !avgSpeed || !time) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const newRun: Run = {
      distance: parseFloat(distance),
      avgSpeed: parseFloat(avgSpeed),
      time,
    };

    onSubmit(newRun);

    setDistance("");
    setAvgSpeed("");
    setTime("");
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="Distância (km)"
        keyboardType="numeric"
        value={distance}
        onChangeText={setDistance}
      />
      <TextInput
        style={styles.input}
        placeholder="Velocidade Média (km/h)"
        keyboardType="numeric"
        value={avgSpeed}
        onChangeText={setAvgSpeed}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário (hh:mm)"
        value={time}
        onChangeText={setTime}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Salvar Corrida</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#FAFAFA",
    color: "#333",
  },
  button: {
    height: 50,
    backgroundColor: "#4CAF50",
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
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
