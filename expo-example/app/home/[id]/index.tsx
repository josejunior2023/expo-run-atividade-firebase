import { faker } from "@faker-js/faker";
import { Stack, useGlobalSearchParams } from "expo-router";
import { Alert, Text, View } from "react-native";

import HeaderRight from "../../../components/HeaderRight";
import Loading from "../../../components/Loading";
import StyledButton from "../../../components/StyledButton";
import useDocument from "../../../firebase/hooks/useDocument";
import globalStyles from "../../../styles/globalStyles";

interface Run {
  id: string;
  distance: number;
  avgSpeed: number;
  time: string;
}

export default function RunDetails() {
  const { id } = useGlobalSearchParams();

  const { data: run, loading, upsert } = useDocument<Run>("runs", id as string);

  if (loading || !run) return <Loading />;

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Detalhes da Corrida",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>Detalhes da Corrida</Text>

      <Text>Distância: {run.distance.toFixed(2)} km</Text>
      <Text>Velocidade Média: {run.avgSpeed.toFixed(2)} km/h</Text>
      <Text>Horário: {run.time}</Text>

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
      />
    </View>
  );
}
