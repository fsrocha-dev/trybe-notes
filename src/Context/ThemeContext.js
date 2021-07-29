import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext()

const lightColors = {
  background: "#ffffff",
  header: "rgb(47, 193, 140)",
  heading: "rgb(47, 193, 140)",
  content: "#ffffff",
  font: "#333333",
  button: {
    background: "#f3f3f3",
    color: "#333333",
  },
  iconButton: {
    background: "none",
    color: "rgb(47, 193, 140)",
  }
}

const darkColors = {
  background: "#333333",
  header: "#333333",
  heading: "#94ECBE",
  content: "#4e4e4e",
  font: "#ffffff",
  button: {
    background: "#4e4e4e",
    color: "#ffffff",
  },
  iconButton: {
    background: "none",
    color: "#94ECBE",
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  const [colors, setColors] = useState(lightColors)

  useEffect(() => {
    setColors(() => {
      return theme === 'light' ? lightColors : darkColors
    })
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)