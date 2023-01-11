import { createContext, useState, useEffect } from "react";
export const darkModeContext = createContext({});

type darkModeContextProviderType = {
    children: React.ReactNode
}

export const darkModeContextProvider(
    { children }: darkModeContextProviderType) => {
    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") || false)
    return children
}
