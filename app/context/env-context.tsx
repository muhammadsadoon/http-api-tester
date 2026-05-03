"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { EnvContextType, EnvVariable } from "../types/type";

const EnvContext = createContext<EnvContextType | undefined>(undefined);

export function EnvProvider({ children }: { children: React.ReactNode }) {
  const [variables, setVariables] = useState<EnvVariable[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("apiPlatformEnvironments");
      if (stored) {
        setVariables(JSON.parse(stored));
      } else {
        // Default variable
        setVariables([
          { id: "var1", key: "base_url", value: "https://jsonplaceholder.typicode.com", isActive: true }
        ]);
      }
    } catch (err) {
      console.error("Failed to load environments from localStorage", err);
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage when variables change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("apiPlatformEnvironments", JSON.stringify(variables));
    }
  }, [variables, isLoaded]);

  const addVariable = useCallback(() => {
    const newVar: EnvVariable = {
      id: `env_${Date.now()}`,
      key: "",
      value: "",
      isActive: true,
    };
    setVariables((prev) => [...prev, newVar]);
  }, []);

  const updateVariable = useCallback(
    (id: string, field: "key" | "value" | "isActive", value: string | boolean) => {
      setVariables((prev) =>
        prev.map((v) => (v.id === id ? { ...v, [field]: value } : v))
      );
    },
    []
  );

  const removeVariable = useCallback((id: string) => {
    setVariables((prev) => prev.filter((v) => v.id !== id));
  }, []);

  return (
    <EnvContext.Provider value={{ variables, addVariable, updateVariable, removeVariable }}>
      {children}
    </EnvContext.Provider>
  );
}

export function useEnvContext() {
  const ctx = useContext(EnvContext);
  if (!ctx) throw new Error("useEnvContext must be used within EnvProvider");
  return ctx;
}
