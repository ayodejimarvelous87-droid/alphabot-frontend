"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  const [dark, setDark] = useState(true);
  const [loaded, setLoaded] = useState(false);


  useEffect(() => {

    const saved = localStorage.getItem("theme");

    if(saved === "light"){

      setDark(false);
      document.documentElement.classList.remove("dark");

    }else{

      setDark(true);
      document.documentElement.classList.add("dark");

    }

    setLoaded(true);

  }, []);



  const toggleTheme = () => {

    const newMode = !dark;

    setDark(newMode);


    if(newMode){

      localStorage.setItem("theme","dark");
      document.documentElement.classList.add("dark");

    }else{

      localStorage.setItem("theme","light");
      document.documentElement.classList.remove("dark");

    }

  };


  if(!loaded){

    return null;

  }


  return (

    <ThemeContext.Provider value={{dark,toggleTheme}}>

      {children}

    </ThemeContext.Provider>

  );

}


export function useTheme(){

  return useContext(ThemeContext);

}
