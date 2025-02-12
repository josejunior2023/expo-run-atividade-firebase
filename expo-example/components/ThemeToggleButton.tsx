import React from "react";
import { Pressable, Text } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

export const ThemeToggleButton = () => {
  const { toggleTheme, theme, colors } = useTheme();

  return (
    <Pressable
      onPress={toggleTheme}
      style={{
        backgroundColor: colors.primaryButtonColor,
        padding: 10,
        borderRadius: 5,
      }}
    >
      <Text style={{ color: colors.textColor }}>
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </Text>
    </Pressable>
  );
};
