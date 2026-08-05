"use client";

export default function CopyButton({
  text,
  setToast,
  label="Copy Link"
}){

  const copy = async()=>{

    try{

      await navigator.clipboard.writeText(text);

      if(setToast){
        setToast("✅ Copied successfully");
      }

    }catch(error){

      if(setToast){
        setToast("❌ Copy failed");
      }

    }

  };


  return(
    <button
      onClick={copy}
      className="
      mt-5
      bg-white
      text-black
      px-5
      py-3
      rounded-xl
      font-bold
      active:scale-95
      transition
      "
    >
      {label}
    </button>
  );

}
