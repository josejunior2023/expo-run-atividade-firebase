import { StyleSheet } from "react-native";

// Definindo o tema e as cores
const theme = {
  primaryColor: "#FFFFFF",
  accentColor: "#FF5252",
  textColor: "#333333",
  borderColor: "#DDDDDD",
  borderRadius: 12,
  padding: 16,
  inputBackground: "#FAFAFA", // Se estiver usando
  buttonTextColor: "#FFFFFF", // Se estiver usando
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.padding,
    backgroundColor: theme.primaryColor,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: theme.textColor,
    marginVertical: 8,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 12,
    borderColor: theme.borderColor,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.inputBackground,
    fontSize: 16,
    color: theme.textColor,
    width: "100%",
    marginTop: 12,
  },
  button: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.accentColor,
    borderRadius: theme.borderRadius,
    width: "100%",
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: theme.buttonTextColor,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: theme.padding,
    backgroundColor: theme.primaryColor,
    borderBottomWidth: 1,
    borderBottomColor: theme.borderColor,
    height: 60,
  },
});

export default globalStyles;
