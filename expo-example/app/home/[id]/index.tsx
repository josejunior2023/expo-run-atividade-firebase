import { faker } from "@faker-js/faker";
import { Stack, useGlobalSearchParams } from "expo-router";
import { Alert, Text, View, StyleSheet } from "react-native";

import HeaderRight from "../../../components/HeaderRight";
import Loading from "../../../components/Loading";
import StyledButton from "../../../components/StyledButton";
import useDocument from "../../../firebase/hooks/useDocument";
import globalStyles from "../../../styles/globalStyles";
import { useTheme } from "../../../contexts/ThemeContext"; // Importando o hook useTheme

interface Run {
  id: string;
  distance: number;
  avgSpeed: number;
  time: string;
}

export default function RunDetails() {
  const { id } = useGlobalSearchParams();
  const { colors } = useTheme(); // Obtendo as cores do tema atual

  const { data: run, loading, upsert } = useDocument<Run>("runs", id as string);

  if (loading || !run) return <Loading />;

  return (
    <View
      style={[
        globalStyles.container,
        { backgroundColor: colors.backgroundColor },
      ]}
    >
      <Stack.Screen
        options={{
          title: "Detalhes da Corrida",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={[globalStyles.title, { color: colors.textColor }]}>
        Detalhes da Corrida
      </Text>

      <Text style={{ color: colors.textColor }}>
        Distância: {run.distance.toFixed(2)} km
      </Text>
      <Text style={{ color: colors.textColor }}>
        Velocidade Média: {run.avgSpeed.toFixed(2)} km/h
      </Text>
      <Text style={{ color: colors.textColor }}>Horário: {run.time}</Text>

      <StyledButton
        title="Atualizar Corrida Aleatoriamente"
        onPress={async () => {
          try {
            await upsert({
              ...run,
              distance: parseFloat(faker.finance.amount(3, 10, 2)),
              avgSpeed: parseFloat(faker.finance.amount(5, 15, 2)),
            });
          } catch (error: any) {
            Alert.alert("Erro ao atualizar corrida", error.toString());
          }
        }}
        buttonStyle={{
          backgroundColor: colors.primaryButtonColor,
        }}
        textStyle={{
          color: colors.buttonTextColor,
        }}
      />
    </View>
  );
}
