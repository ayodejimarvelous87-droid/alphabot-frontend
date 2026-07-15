"use client";

import {createContext,useContext,useEffect,useState} from "react";

const ThemeContext=createContext();


export function ThemeProvider({children}){

const [dark,setDark]=useState(true);


useEffect(()=>{

const saved=localStorage.getItem("theme");

if(saved==="light"){
setDark(false);
document.documentElement.classList.remove("dark");
}else{
document.documentElement.classList.add("dark");
}

},[]);



const toggleTheme=()=>{

const mode=!dark;

setDark(mode);


if(mode){

localStorage.setItem("theme","dark");
document.documentElement.classList.add("dark");

}else{

localStorage.setItem("theme","light");
document.documentElement.classList.remove("dark");

}

};



return(

<ThemeContext.Provider value={{dark,toggleTheme}}>

{children}

</ThemeContext.Provider>

);

}



export function useTheme(){

return useContext(ThemeContext);

}
