import React from "react";
import { plan } from "./assets/constants";
import UserModel from "./models/UserModel";

export type User = {
  accessToken: string;
  user: UserModel;
}

export type UserContext = {
  user: UserModel | null;
  setUser: (user: UserModel) => void;
  login: (newUser: User) => void;
  logout: () => void;
  updatePlan: () => void;
};

const UserContext = React.createContext<UserContext>(null!);
export default UserContext;

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserModel | null>(null);

  const login = (newUser: User) => {
    setUser(newUser.user);
    localStorage.setItem('token', newUser.accessToken);
    localStorage.setItem('user', JSON.stringify(newUser.user));
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  const updatePlan = () => {
    let newUser = {
      ...user!,
      type: plan.PREMIUM
    }
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  }

  const stateValues = {
    user,
    setUser,
    login,
    logout,
    updatePlan,
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