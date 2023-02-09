import { createContext, useEffect, useState, ReactNode, FC } from "react";
import axios from "axios";
type UserType = {
  id: number;
  name: string;
  surname: string;
  profilePhoto: string;
};

type AuthContextType = {
  login: (loginData: LoginType) => void;
  user: UserType;
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
  const [user, setUser] = useState<UserType>(
    JSON.parse(localStorage.getItem("user")!) || null
  );
  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8080/api/v1/auth/login",
      inputs,
      { withCredentials: true }
    );
    setUser(res.data);
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
