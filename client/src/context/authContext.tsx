import { createContext, useEffect, useState, ReactNode, FC } from "react";
import axios from "axios";
type UserContextType = {
  id: number;
  name: string;
  surname: string;
  profilePhoto?: string;
};

type AuthContextType = {
  login: (loginData: LoginType) => void;
  user: UserContextType;
  setUser: (
    value: UserContextType | ((prev: UserContextType) => UserContextType)
  ) => void;
};
type AuthContextProviderType = {
  children: ReactNode;
};

export type LoginType = {
  username: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: FC<AuthContextProviderType> = ({
  children,
}) => {
  const [user, setUser] = useState<UserContextType>(
    JSON.parse(localStorage.getItem("user")!) || null
  );
  const login = async (inputs: LoginType) => {
    const res = await axios.post(
      "http://localhost:8080/api/v1/auth/login",
      inputs,
      { withCredentials: true }
    );
    const newUser: UserContextType = res.data;
    setUser(newUser);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
