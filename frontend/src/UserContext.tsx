import React from "react";
import UserModel from "./models/UserModel";

export type UserContext = {
  user: UserModel | null;
  setUser: (user: UserModel) => void;
  login: (newUser: UserModel) => void;
  logout: () => void;
};

const UserContext = React.createContext<UserContext>(null!);
export default UserContext;

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserModel | null>(null);

  const login = (newUser: UserModel) => {
    setUser(newUser);
    localStorage.setItem("token", newUser.token!);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const stateValues = {
    user,
    setUser,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={stateValues}>
      {children}
    </UserContext.Provider>
  );
};

export function useAuth() {
  return React.useContext(UserContext);
};