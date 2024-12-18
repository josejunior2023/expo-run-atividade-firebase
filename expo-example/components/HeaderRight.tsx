import { useRouter } from "expo-router";
import { Alert, Text, View, StyleSheet, TouchableOpacity } from "react-native";

import useAuth from "../firebase/hooks/useAuth";

export default function HeaderRight() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.userEmail}>{user?.email}</Text>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          try {
            await logout();
            router.replace("/");
          } catch (error: any) {
            Alert.alert("Erro ao sair", error.toString());
          }
        }}
      >
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
  },
  logoutButton: {
    backgroundColor: "#FF5252",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});
