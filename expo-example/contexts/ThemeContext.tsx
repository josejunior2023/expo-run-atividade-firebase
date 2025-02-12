import React, { createContext, useState, useContext, ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeColors {
  backgroundColor: string;
  textColor: string;
  primaryButtonColor: string;
  borderColor: string;
  inputBackground: string;
  buttonTextColor: string;
  logoutButtonColor: string; // Adicionando a cor do botão de logout
}

interface ThemeContextProps {
  theme: Theme;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const lightTheme: ThemeColors = {
  backgroundColor: "#FFFFFF",
  textColor: "#000000",
  primaryButtonColor: "#4CAF50",
  borderColor: "#DDDDDD",
  inputBackground: "#F9F9F9",
  buttonTextColor: "#FFFFFF",
  logoutButtonColor: "#FF5252", // Cor do botão de logout no tema claro
};

const darkTheme: ThemeColors = {
  backgroundColor: "#121212", // Cor de fundo escura
  textColor: "#E0E0E0", // Texto em um tom de cinza claro para contraste, sem ser muito forte
  primaryButtonColor: "#6200EE", // Cor de botão roxo suave
  borderColor: "#444444", // Cor das bordas um pouco mais clara para não sumir no fundo escuro
  inputBackground: "#3A3A40", // Cor do fundo dos campos de input mais escuro
  buttonTextColor: "#FFFFFF", // Texto do botão em branco para contraste
  logoutButtonColor: "#FF4081", // Cor vibrante para o botão de logout (rosa)
};

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const colors = theme === "light" ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ theme, colors, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
