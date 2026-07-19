"use client";

import Link from "next/link";
import BottomNav from "@/components/BottomNav";


const services = [
{
name:"Airtime",
icon:"📱",
desc:"Buy airtime instantly",
link:"/airtime"
},
{
name:"Data",
icon:"🌐",
desc:"Purchase data bundles",
link:"/data"
},
{
name:"Electricity",
icon:"⚡",
desc:"Pay electricity bills",
link:"/electricity"
},
{
name:"TV Subscription",
icon:"📺",
desc:"Renew TV packages",
link:"/tv"
},
{
name:"Betting",
icon:"🎮",
desc:"Fund betting accounts",
link:"/betting"
},
{
name:"Exam PIN",
icon:"🎓",
desc:"Buy exam tokens",
link:"/exam-pin"
},
{
name:"Airtime Cash",
icon:"💵",
desc:"Convert airtime to cash",
link:"/airtime-cash"
},
{
name:"Bank Transfer",
icon:"🏦",
desc:"Transfer money",
link:"/bank"
}
];


export default function Services(){

const [products,setProducts]=useState([]);

const [loading,setLoading]=useState(true);


const getServiceLink=(type)=>{

const routes={

"Airtime":"/airtime",
"Data":"/data",
"Electricity":"/electricity",
"TV":"/tv",
"Betting":"/betting",
"Exam PIN":"/exam-pin",
"Airtime Cash":"/airtime-cash",
"Bank":"/bank"

};

return routes[type] || "/services";

};


useEffect(()=>{

fetch("https://alphabot-main.onrender.com/products")

.then(res=>res.json())

.then(data=>{

setProducts(data);

setLoading(false);

})

.catch(()=>{

setLoading(false);

});


},[]);

return(

<main className="min-h-screen bg-white text-black dark:bg-black dark:text-white px-5 py-8 pb-24">


<div className="max-w-md mx-auto">


<h1 className="text-3xl font-bold">
Services 🛠️
</h1>


<p className="text-zinc-500 dark:text-zinc-400 mt-2">
Choose any AlphaBot service
</p>



<div className="grid grid-cols-2 gap-4 mt-8">


{loading ? (

<p className="text-zinc-500 mt-5">
Loading services...
</p>

) : (

products.map((product)=>(

<Link
key={product._id}
href={getServiceLink(product.type)}
className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-5 hover:border-yellow-400 active:scale-95 transition duration-150"
>


<div className="text-4xl">
🛒
</div>


<h2 className="font-bold mt-4">
{product.name}
</h2>


<p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
{product.network} • {product.type}

<br />

₦{product.price}
</p>


</Link>

))}
)}


</div>


</div>


<BottomNav />


</main>

);

}
