import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface StyledButtonProps {
  title: string;
  onPress: () => void;
  textStyle?: object;
  buttonStyle?: object;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  title,
  onPress,
  textStyle,
  buttonStyle,
}) => (
  <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default StyledButton;
