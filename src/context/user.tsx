"use client";

import logout from "@/actions/logout";
import validateToken from "@/actions/validate-token";
import { User } from "@/interfaces/origamid/user";
import React from "react";

type IUserContext = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
};

const UserContext = React.createContext<IUserContext | null>(null);

export const useUserContext = () => {
  const context = React.useContext(UserContext);
  if (context === null) {
    throw new Error("useContext must be inside a Provider");
  }
  return context;
};

export function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: IUserContext["user"];
}) {
  const [userState, setUser] = React.useState<User | undefined>(user);

  React.useEffect(() => {
    async function validate() {
      const { ok } = await validateToken();
      if (!ok) await logout();
    }
    if (userState) validate();
  }, [userState]);

  return (
    <UserContext.Provider value={{ user: userState, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
