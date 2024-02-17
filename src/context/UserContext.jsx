import { createContext, useState } from "react";
import { apiConnector } from "@/services/apiConnector";
export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const value = {
    loading,
    setLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
