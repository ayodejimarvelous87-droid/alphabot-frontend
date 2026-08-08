from pathlib import Path

path = Path("src/app/data/page.js")

text = path.read_text()

text = text.replace(
'''(plan.size || "").toLowerCase().includes(q) ||
      String(plan.price || "").includes(q)''',
'''(plan.size || "").toLowerCase().includes(q) ||
      (plan.type || "").toLowerCase().includes(q) ||
      String(plan.price || "").includes(q)'''
)

path.write_text(text)

print("✅ Added plan type search")
