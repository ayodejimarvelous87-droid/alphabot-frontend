"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

const [dark,setDark] = useState(false);
const [loaded,setLoaded] = useState(false);


useEffect(()=>{

const saved = localStorage.getItem("theme");


if(saved){

const isDark = saved === "dark";

setDark(isDark);

document.documentElement.classList.toggle("dark",isDark);

}else{

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

setDark(prefersDark);

document.documentElement.classList.toggle("dark",prefersDark);

}


setLoaded(true);


},[]);



const toggleTheme=()=>{

const newMode=!dark;

setDark(newMode);

localStorage.setItem(
"theme",
newMode ? "dark" : "light"
);

document.documentElement.classList.toggle(
"dark",
newMode
);

};



if(!loaded){
return null;
}


return(
<ThemeContext.Provider value={{dark,toggleTheme}}>
{children}
</ThemeContext.Provider>
);


}


export function useTheme(){

return useContext(ThemeContext);

}
