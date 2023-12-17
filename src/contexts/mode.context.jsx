import { useContext, useState, createContext } from 'react';

const ModeContext = createContext(null);

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const isDarkMode = () => {
    return mode === 'dark';
  };

  const isLightMode = () => {
    return mode === 'light';
  };

  const setDarkMode = () => {
    setMode('dark');
  };
  const setLightMode = () => {
    setMode('light');
  };

  const toggleMode = () => {
    if (mode === 'light') setDarkMode();
    else setLightMode();
  };
  return (
    <ModeContext.Provider
      value={{ setDarkMode, setLightMode, isDarkMode, isLightMode, toggleMode }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ModeContext);
  if (!context) throw new Error('theme context not provided');
  return context;
};
