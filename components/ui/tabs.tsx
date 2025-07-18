import React, { useState, createContext, useContext } from 'react';

interface TabsContextType {
  value: string;
  setValue: (val: string) => void;
}
const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs: React.FC<{ value: string; onValueChange: (val: string) => void; children: React.ReactNode }> = ({ value, onValueChange, children }) => {
  return (
    <TabsContext.Provider value={{ value, setValue: onValueChange }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`flex rounded-lg bg-[#232323] ${className}`}>{children}</div>
);

export const TabsTrigger: React.FC<{ value: string; className?: string; children: React.ReactNode }> = ({ value, className, children }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabsTrigger must be used within Tabs');
  const active = ctx.value === value;
  return (
    <button
      type="button"
      className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${active ? 'bg-[#00ff88] text-[#1a1a1a]' : 'text-[#ccff00] hover:bg-[#232323]'} ${className}`}
      onClick={() => ctx.setValue(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<{ value: string; className?: string; children: React.ReactNode }> = ({ value, className, children }) => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('TabsContent must be used within Tabs');
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}; 