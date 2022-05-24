import { createContext, useEffect, useMemo, useState } from "react";

export const CredentialContext = createContext();

export default function CredentialProvider({ children }) {
  const [context, setContext] = useState({ isAdmin: localStorage.getItem("isAdmin") });
  const isAdmin = context?.isAdmin;

  useEffect(() => {
    if (isAdmin !== null) {
      localStorage.setItem("isAdmin", isAdmin);
    }
    else {
      localStorage.removeItem("isAdmin");
    }
  }, [isAdmin])

  return (
    <CredentialContext.Provider
      value={[context, setContext]}
    >
      {children}
    </CredentialContext.Provider>
  );
}
