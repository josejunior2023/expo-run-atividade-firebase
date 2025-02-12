import { Stack } from "expo-router";
import {
  Alert,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext"; // Hook para acessar o tema

import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import ViewRun from "../../components/ViewRun";
import useCollection from "../../firebase/hooks/useCollection";
import Run from "../../types/Run";
import RunForm from "../../components/RunForm";

export default function Home() {
  const {
    data,
    create,
    remove,
    refreshData,
    loading: loadingCollection,
  } = useCollection<Run>("runs");
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(false); // Estado de loading para a criação da corrida
  const { theme, colors } = useTheme(); // Pegando o tema e as cores do contexto

  const handleCreateRun = async (newRun: Run) => {
    setLoading(true); // Definir como verdadeiro enquanto cria a corrida
    try {
      await create(newRun);
      await refreshData();
      Alert.alert("Sucesso", "Corrida cadastrada com sucesso!");
    } catch (error: any) {
      Alert.alert("Erro ao criar corrida", error.toString());
    } finally {
      setLoading(false); // Definir como falso quando a criação for concluída
    }
  };

  // UseEffect para monitorar mudanças no loadingCollection e garantir que o estado de loading seja resetado
  useEffect(() => {
    if (!loadingCollection) {
      setLoading(false); // Garantir que o loading seja desativado quando a coleta de dados terminar
    }
  }, [loadingCollection]);

  // Controle de carregamento com base no estado do loadingCollection e loading
  const isLoading = loadingCollection || loading;

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundColor }]}
    >
      <Stack.Screen
        options={{
          title: "Corridas",
          headerStyle: {
            backgroundColor: colors.primaryButtonColor, // Cor de fundo do cabeçalho
          },
          headerTintColor: colors.textColor, // Cor do texto no cabeçalho
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={[styles.title, { color: colors.textColor }]}>
        Gerencie suas corridas!
      </Text>

      <TouchableOpacity
        style={[
          styles.actionButton,
          isCreating && styles.cancelButton,
          { backgroundColor: colors.primaryButtonColor },
        ]}
        onPress={() => setIsCreating((prev) => !prev)}
      >
        <Text
          style={[
            styles.actionButtonText,
            {
              color: theme === "light" ? "#000000" : "#FFFFFF", // Ajuste para texto preto no modo claro e branco no modo escuro
            },
          ]}
        >
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

      {/* Condição de carregamento atualizada */}
      {isLoading ? (
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
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  actionButton: {
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
    fontSize: 16,
    fontWeight: "bold",
  },
  listContainer: {
    paddingBottom: 16,
  },
});
