 "use client";

export default function PhoneInput({
  value,
  onChange,
  beneficiaries = [],
  service = "",
  showContactPicker = false
}) {
  const selectContact = async () => {
    try {
      if (!("contacts" in navigator) || !navigator.contacts?.select) {
        alert("Contact selection is not supported on this browser. Please enter the number manually.");
        return;
      }

      const contacts = await navigator.contacts.select(
        ["name", "tel"],
        { multiple: false }
      );

      if (!contacts?.length) return;

      const contact = contacts[0];
      const rawPhone = contact.tel?.[0];

      if (!rawPhone) {
        alert("This contact does not have a phone number.");
        return;
      }

      const digits = rawPhone.replace(/\D/g, "");

      let phone = digits;

      if (phone.startsWith("234")) {
        phone = "+" + phone;
      } else if (phone.startsWith("0")) {
        phone = "+234" + phone.slice(1);
      } else {
        phone = "+234" + phone;
      }

      onChange(phone);
    } catch (error) {
      if (error?.name !== "AbortError") {
        console.error("Contact picker error:", error);
        alert("Unable to access your contacts. Please enter the number manually.");
      }
    }
  };
  const matches = beneficiaries.filter(
    (item) =>
      (item.beneficiary_phone || "").includes(value) &&
      value.length > 1 &&
      (!service || item.service === service)
  );

  return (
    <div className="w-full mt-4">
      <div className="flex items-center gap-3">
        <div className="shrink-0 px-1 text-sm font-bold text-zinc-500 dark:text-zinc-400">
          +234
        </div>

        <div className="phone-input-shell flex items-center flex-1 min-h-[52px]">
          <input
            type="tel"
            className="phone-number-input flex-1"
            placeholder="Phone number"
            value={value.replace("+234", "")}
            onChange={(e) => {
              const digits = e.target.value
                .replace(/\D/g, "")
                .slice(0, 11);

              onChange("+234" + digits);
            }}
          />

          {showContactPicker && (
            <button
              type="button"
              onClick={selectContact}
              aria-label="Select contact"
              title="Select contact"
              className="shrink-0 mr-2 w-10 h-10 rounded-xl bg-yellow-400 text-black flex items-center justify-center shadow-sm hover:bg-yellow-300 active:scale-95 transition"
            >
              <span className="text-base">👤</span>
            </button>
          )}
        </div>
      </div>

      {matches.length > 0 && (
        <div className="mt-3 space-y-2">
          {matches.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() =>
                onChange(
                  item.beneficiary_phone.startsWith("+234")
                    ? item.beneficiary_phone
                    : "+234" + item.beneficiary_phone
                )
              }
              className="w-full text-left bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-4 border hover:border-yellow-400 transition"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-bold">{item.name}</p>

                  <p className="text-sm text-zinc-500">
                    📞 {item.beneficiary_phone}
                  </p>
                </div>

                <div className="text-xl">
                  {item.service === "data"
                    ? "🌐"
                    : item.service === "airtime"
                    ? "📱"
                    : item.service === "tv"
                    ? "📺"
                    : "⚡"}
                </div>
              </div>

              <p className="text-xs text-yellow-500 mt-2 uppercase">
                {item.service}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
