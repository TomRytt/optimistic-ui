import { createContext, useContext, useState, ReactNode } from 'react';

interface DelayContextType {
  delay: number;
  setDelay: (delay: number) => void;
}

const DelayContext = createContext<DelayContextType | undefined>(undefined);

export function DelayProvider({ children }: { children: ReactNode }) {
  const [delay, setDelay] = useState(3);

  return (
    <DelayContext.Provider value={{ delay, setDelay }}>
      {children}
    </DelayContext.Provider>
  );
}

export function useDelay() {
  const context = useContext(DelayContext);
  if (!context) {
    throw new Error('useDelay must be used within DelayProvider');
  }
  return context;
}
