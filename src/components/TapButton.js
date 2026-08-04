"use client";

export default function TapButton({
children,
onClick,
className=""
}){

return(

<button
onClick={onClick}
className={`
transition-all
duration-150
active:scale-95
active:animate-pulse
hover:scale-[1.02]
${className}
`}
>

{children}

</button>

);

}
