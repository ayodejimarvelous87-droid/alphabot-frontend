from pathlib import Path

file = Path("src/app/receipt/[id]/page.js")

text = file.read_text()

replacements = [
(
'''            <Row
              title="Provider Order ID"
              value={
                receipt.providerResponse?.data?.order_id ||
                "-"
              }
            />''',
""
),
(
'''            <Row
              title="Flutterwave Ref"
              value={receipt.flutterwaveReference || "-"}
            />

            <Row
              title="Flutterwave ID"
              value={receipt.flutterwaveId || "-"}
            />''',
""
),
(
'''            <Row
              title="Date"
              value={new Date(receipt.createdAt).toLocaleString()}
            />''',
""
)
]

for old,new in replacements:
    text = text.replace(old,new)

marker = '''            <Row
              title="Status"
              value={receipt.status}
            />'''

insert = '''            <Row
              title="Status"
              value={receipt.status}
            />

            <TechnicalDetails receipt={receipt} />'''

if marker in text:
    text = text.replace(marker, insert)
else:
    print("Status marker not found")

file.write_text(text)

print("✅ Receipt technical section updated")
