"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: React.ReactNode }) {
  const [tabs, setTabs] = useState<TabData[]>([
    {
      id: "tab1",
      label: "GET",
      method: "GET",
      url: "",
      body: "",
      headers: [{ key: "", value: "", checked: true }],
      response: null,
      jsonError: null,
    },
  ]);
  const [activeTab, setActiveTabState] = useState<string>("tab1");

  const addTab = useCallback((method: DefualtMethods) => {
    const newId = `tab${Date.now()}`;
    const newTab: TabData = {
      id: newId,
      label: method,
      method,
      url: "",
      body: "",
      headers: [{ key: "", value: "", checked: true }],
      response: null,
      jsonError: null,
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabState(newId);
  }, []);

  const closeTab = useCallback(
    (id: string) => {
      setTabs((prev) => {
        if (prev.length === 1) return prev;
        const idx = prev.findIndex((t) => t.id === id);
        const newTabs = prev.filter((t) => t.id !== id);
        if (activeTab === id) {
          if (idx > 0) setActiveTabState(newTabs[idx - 1].id);
          else setActiveTabState(newTabs[0].id);
        }
        return newTabs;
      });
    },
    [activeTab]
  );

  const setActiveTab = useCallback((id: string) => {
    setActiveTabState(id);
  }, []);

  const updateTab = useCallback(
    (id: string, data: Partial<Omit<TabData, "id">>) => {
      setTabs((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...data } : t))
      );
    },
    []
  );

  return (
    <TabContext.Provider
      value={{ tabs, activeTab, addTab, closeTab, setActiveTab, updateTab }}
    >
      {children}
    </TabContext.Provider>
  );
}

export function useTabContext() {
  const ctx = useContext(TabContext);
  if (!ctx) throw new Error("useTabContext must be used within TabProvider");
  return ctx;
}

