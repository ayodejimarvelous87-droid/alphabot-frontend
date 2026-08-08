from pathlib import Path

path = Path("src/app/data/page.js")

text = path.read_text()

old = '''<div className="mb-5">
<input
type="text"
value={search}
onChange={(e)=>setSearch(e.target.value)}
placeholder="Search data plans..."
className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
/>
</div>

'''

if old in text:
    text = text.replace(old, "", 1)
    path.write_text(text)
    print("✅ Old search removed")
else:
    print("❌ Old search block not found")
