from pathlib import Path
import re

file = Path("src/app/receipt/[id]/page.js")

text = file.read_text()

# Remove Flutterwave rows
text = re.sub(
    r'\s*<Row\s+title="Flutterwave Ref".*?\/>',
    '',
    text,
    flags=re.S
)

text = re.sub(
    r'\s*<Row\s+title="Flutterwave ID".*?\/>',
    '',
    text,
    flags=re.S
)

# Insert TechnicalDetails after Status row
pattern = r'(<Row\s+title="Status".*?\/>)'

if "TechnicalDetails receipt={receipt}" not in text:
    text, count = re.subn(
        pattern,
        r'\1\n\n            <TechnicalDetails receipt={receipt} />',
        text,
        count=1,
        flags=re.S
    )

    if count == 0:
        print("Status row not found")
else:
    print("TechnicalDetails already inserted")

file.write_text(text)

print("✅ Technical cleanup done")
