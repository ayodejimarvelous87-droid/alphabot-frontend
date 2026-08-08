from pathlib import Path

path = Path("src/app/data/page.js")

text = path.read_text()

old = '''return(

<div className="mb-5">
<input
type="text"
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder="Search data plans..."
className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
/>
</div>

<ServiceLayout'''

new = '''return(

<ServiceLayout'''

text = text.replace(old,new)

marker = '''message={message}
>'''

insert = '''message={message}
>

<div className="mb-5">
<input
type="text"
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder="Search data plans..."
className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
/>
</div>'''

text = text.replace(marker, insert)

path.write_text(text)

print("✅ Search moved inside ServiceLayout")
