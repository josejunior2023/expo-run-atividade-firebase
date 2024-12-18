import { Stack } from "expo-router";
import {
  Alert,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import ViewRun from "../../components/ViewRun";
import useCollection from "../../firebase/hooks/useCollection";
import Run from "../../types/Run";
import RunForm from "../../components/RunForm";

export default function Home() {
  const { data, create, remove, refreshData, loading } =
    useCollection<Run>("runs");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRun = async (newRun: Run) => {
    try {
      await create(newRun);
      await refreshData();
      Alert.alert("Sucesso", "Corrida cadastrada com sucesso!");
    } catch (error: any) {
      Alert.alert("Erro ao criar corrida", error.toString());
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Corridas",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={styles.title}>Gerencie suas corridas!</Text>

      <TouchableOpacity
        style={[styles.actionButton, isCreating && styles.cancelButton]}
        onPress={() => setIsCreating((prev) => !prev)}
      >
        <Text style={styles.actionButtonText}>
          {isCreating ? "Cancelar" : "Adicionar Corrida"}
        </Text>
      </TouchableOpacity>

      {isCreating && (
        <RunForm
          onSubmit={(run) => {
            handleCreateRun(run);
            setIsCreating(false);
          }}
        />
      )}

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ViewRun
              run={item}
              onDelete={async () => {
                await remove(item.id!);
                await refreshData();
              }}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  cancelButton: {
    backgroundColor: "#FF5252",
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 16,
  },
});
