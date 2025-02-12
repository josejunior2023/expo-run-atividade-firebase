import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";

import Loading from "../components/Loading";
import StyledButton from "../components/StyledButton";
import useAuth from "../firebase/hooks/useAuth";
import globalStyles from "../styles/globalStyles";
import { useTheme } from "../contexts/ThemeContext"; // Certifique-se de que o tema esteja importado

export default function _screen() {
  const { user, login, loading } = useAuth();
  const router = useRouter();
  const { colors, theme } = useTheme(); // Pegar as cores e o tema

  const [email, setEmail] = useState("jr@teste.com.br");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    if (user) {
      router.replace("/home/");
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <View
      style={[
        globalStyles.container,
        { backgroundColor: colors.backgroundColor },
      ]}
    >
      <Text style={[globalStyles.title, { color: colors.textColor }]}>
        Expo Run
      </Text>

      <TextInput
        style={[
          globalStyles.input,
          { backgroundColor: colors.inputBackground, color: colors.textColor },
        ]}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor={theme === "dark" ? "#B0B0B0" : "#888"} // Placeholder branco no modo escuro e cinza no claro
      />
      <TextInput
        style={[
          globalStyles.input,
          { backgroundColor: colors.inputBackground, color: colors.textColor },
        ]}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Senha"
        placeholderTextColor={theme === "dark" ? "#B0B0B0" : "#888"} // Placeholder branco no modo escuro e cinza no claro
      />

      <StyledButton
        title="Login"
        onPress={async () => {
          try {
            await login(email, password);
            router.push("/home/");
          } catch (error: any) {
            Alert.alert("Login error", error.toString());
          }
        }}
        textStyle={{ color: colors.buttonTextColor }}
        buttonStyle={{
          backgroundColor: colors.primaryButtonColor,
          marginTop: 20,
          width: 130,
        }}
      />
    </View>
  );
}
