from pathlib import Path

path = Path("src/app/data/page.js")

text = path.read_text()

text = text.replace(
'''const [loading,setLoading]=useState(false);
  const [beneficiaries,setBeneficiaries]=useState([]);''',
'''const [loading,setLoading]=useState(false);
  const [search,setSearch]=useState("");
  const [beneficiaries,setBeneficiaries]=useState([]);'''
)

text = text.replace(
'''  const getCategoryCount = (cat)=>{''',
'''
  const filteredPlans = dataPlans.filter(plan=>{
    const q = search.toLowerCase();

    return (
      (plan.data_plan || "").toLowerCase().includes(q) ||
      (plan.name || "").toLowerCase().includes(q) ||
      (plan.size || "").toLowerCase().includes(q) ||
      String(plan.price || "").includes(q)
    );
  });


  const getCategoryCount = (cat)=>{'''
)

text = text.replace(
"{dataPlans.map((plan,index)=>(",
"{filteredPlans.map((plan,index)=>("
)

marker = '''<ServiceLayout'''

search_box = '''
<div className="mb-5">
<input
type="text"
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder="Search data plans..."
className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
/>
</div>

'''

text = text.replace(marker, search_box + marker, 1)

path.write_text(text)

print("✅ Data search added")
