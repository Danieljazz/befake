import { createContext, useState, useEffect, ReactNode, FC } from "react";

type DarkModeContextProviderType = {
  children?: ReactNode;
};

type DarkModeContextType = {
  darkMode: boolean;
  toggle: () => void;
};
export const DarkModeContext = createContext({} as DarkModeContextType);
export const DarkModeContextProvider: FC<DarkModeContextProviderType> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("darkMode")!) || false
  );

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
