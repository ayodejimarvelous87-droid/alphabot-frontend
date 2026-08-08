from pathlib import Path

path = Path("src/app/data/page.js")

text = path.read_text()

marker = "const getCategoryCount = (cat)=>{"

code = '''
const filteredPlans = dataPlans.filter((plan)=>{

const text = (
  plan.data_plan ||
  plan.name ||
  plan.size ||
  ""
).toLowerCase();

return text.includes(search.toLowerCase());

});


'''

if marker in text:
    text = text.replace(marker, code + marker, 1)
    path.write_text(text)
    print("✅ filteredPlans added")
else:
    print("❌ marker not found")
