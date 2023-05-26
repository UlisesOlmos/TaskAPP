import { useState, createContext, useContext,useEffect } from 'react';

const ThemeContext = createContext();

const loadTheme = (setTheme) => {
  const body = document.querySelector('body');
  switch (localStorage.getItem('theme')) {
    case 'dark':
      body.classList.add('dark');
      setTheme('dark');
      break;
    case 'light':
      setTheme('light');
      break;
    default:
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setTheme('dark');
        break;
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        localStorage.setItem('theme', 'light');
        setTheme('light');
        break;
      }
      break;
  }
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    const body = document.body;
    if (theme === 'light') {
      body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme("dark");
    } else {
      body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme("light");
    }
  };

  useEffect(() => {
    if (document.readyState === 'complete') {
        loadTheme(setTheme);
    } else {
        window.addEventListener("load", loadTheme(setTheme));
        return () => window.removeEventListener("load", loadTheme(setTheme));
    };
    
}, []);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export { ThemeProvider, useTheme };