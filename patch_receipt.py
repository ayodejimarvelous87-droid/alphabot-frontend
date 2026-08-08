from pathlib import Path

file = Path("src/app/receipt/[id]/page.js")

text = file.read_text()

if "function TechnicalDetails" in text:
    print("Already added")
    exit()

marker = "function Row({ title, value }) {"

code = r'''
function TechnicalDetails({ receipt }) {
  return (
    <div className="mt-6 rounded-2xl bg-[#0A0A0C] border border-zinc-800 p-5">
      <details className="group">

        <summary className="flex items-center justify-between cursor-pointer list-none">
          <div className="flex items-center gap-2">
            <span className="text-purple-400 group-open:rotate-90 transition-transform">
              ▶
            </span>

            <span className="font-bold text-sm">
              Technical Details
            </span>
          </div>

          <span className="text-xs text-zinc-500 group-open:hidden">
            Show
          </span>

          <span className="text-xs text-zinc-500 hidden group-open:inline">
            Hide
          </span>
        </summary>

        <div className="mt-4 space-y-3">

          <TechnicalRow
            title="Provider Order ID"
            value={receipt.providerResponse?.data?.order_id || "N/A"}
          />

          <TechnicalRow
            title="Flutterwave Reference"
            value={receipt.flutterwaveReference || "N/A"}
          />

          <TechnicalRow
            title="Flutterwave ID"
            value={receipt.flutterwaveId || "N/A"}
          />

        </div>

      </details>
    </div>
  );
}


function TechnicalRow({title,value}) {

  const copy = () => {
    if(value !== "N/A"){
      navigator.clipboard.writeText(value);
    }
  };

  return (
    <div className="flex justify-between items-center p-3 rounded-xl bg-zinc-900 border border-zinc-800">

      <div>
        <p className="text-xs text-zinc-500">
          {title}
        </p>

        <p className="text-sm font-mono break-all mt-1">
          {value}
        </p>
      </div>

      {value !== "N/A" && (
        <button
          onClick={copy}
          className="text-xs bg-zinc-800 px-3 py-2 rounded-lg"
        >
          Copy
        </button>
      )}

    </div>
  );
}


'''

if marker not in text:
    print("Row marker not found")
    exit()

text = text.replace(marker, code + marker)

file.write_text(text)

print("✅ TechnicalDetails inserted")
