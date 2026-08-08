from pathlib import Path

file = Path("src/app/receipt/[id]/page.js")

text = file.read_text()

# Remove Flutterwave rows
start = text.find('            <Row\n              title="Flutterwave Ref"')
end = text.find('            />', start)

if start != -1 and end != -1:
    end += len('            />')
    block = text[start:end]

    # remove first row
    text = text.replace(block, "", 1)

# Remove second Flutterwave row
start = text.find('            <Row\n              title="Flutterwave ID"')
end = text.find('            />', start)

if start != -1 and end != -1:
    end += len('            />')
    block = text[start:end]
    text = text.replace(block, "", 1)


# Insert TechnicalDetails after Status row
marker = '''            <Row
              title="Status"
              value={receipt.status}
            />'''

if marker in text:
    text = text.replace(
        marker,
        marker + '''

            <TechnicalDetails receipt={receipt} />''',
        1
    )
else:
    print("Status marker still not found")

file.write_text(text)

print("✅ Technical section fixed")
