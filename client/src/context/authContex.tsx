import { createContext, useEffect, useState, ReactNode, FC } from "react";

type UserType = {
  id: string;
  name: string;
  profilePhoto: string;
};

type AuthContextType = {
  login: () => void;
  user: UserType;
};
type AuthContextProviderType = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: FC<AuthContextProviderType> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>(
    JSON.parse(localStorage.getItem("user")!) || ({} as UserType)
  );
  const login = () => {
    setUser({
      id: "sadadadad",
      name: "John Doe",
      profilePhoto:
        "https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    });
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);
  return (
    <AuthContext.Provider value={{ login, user }}>
      {children}
    </AuthContext.Provider>
  );
};
