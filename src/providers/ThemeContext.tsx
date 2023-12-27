import {createContext, useEffect, useState} from 'react';
import {MMKV} from 'react-native-mmkv';
import {storage} from '../utils/storage.ts';
import {styles} from '../screens/FavoritesScreen.tsx';

export const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({children}: any) => {
  const [isDark, setIsDark] = useState(
    storage.getBoolean('isDarkMode') || false,
  );

  useEffect(() => {
    storage.set('isDarkMode', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{isDark, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
