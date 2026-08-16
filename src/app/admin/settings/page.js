"use client";

import {useEffect,useState} from "react";

export default function AdminSettings(){

const [settings,setSettings]=useState({
maintenanceMode:false,
announcement:"",
referralPercentage:1,
providerMinimumBalance:500,
abCoinsPer100Naira:0.2,
abCoinsRedemptionTarget:1000,
abCoinsRedemptionReward:200,
membershipSilverPrice:1000,
membershipGoldPrice:2000,
membershipDurationDays:30,
paymentBankName:"",
paymentAccountName:"",
paymentAccountNumber:""
});

const [message,setMessage]=useState("");
const [membershipRequests,setMembershipRequests]=useState([]);
const [membershipLoading,setMembershipLoading]=useState(false);
const [membershipMessage,setMembershipMessage]=useState("");



const loadSettings=async()=>{

const token=localStorage.getItem("adminToken");

const res=await fetch(
"https://api.alphabothq.com/settings",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await res.json();

setSettings(prev=>({
...prev,
maintenanceMode:data.maintenanceMode ?? false,
announcement:data.announcement ?? "",
referralPercentage:data.referralPercentage ?? 1,
providerMinimumBalance:data.providerMinimumBalance ?? 500,
abCoinsPer100Naira:data.abCoinsPer100Naira ?? 0.2,
abCoinsRedemptionTarget:data.abCoinsRedemptionTarget ?? 1000,
abCoinsRedemptionReward:data.abCoinsRedemptionReward ?? 200
}));

};


useEffect(()=>{
loadSettings();
loadMembershipAdmin();
},[]);



const saveSettings=async()=>{

const token=localStorage.getItem("adminToken");

const res=await fetch(
"https://api.alphabothq.com/admin/system-settings",
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
  ...settings,
  referralPercentage:Number(settings.referralPercentage),
  providerMinimumBalance:Number(settings.providerMinimumBalance),
  abCoinsPer100Naira:Number(settings.abCoinsPer100Naira),
  abCoinsRedemptionTarget:Number(settings.abCoinsRedemptionTarget),
  abCoinsRedemptionReward:Number(settings.abCoinsRedemptionReward)
})
}
);


const data=await res.json();

setMessage(
res.ok ? "✅ Settings updated" : data.message
);

};




const loadMembershipAdmin=async()=>{

try{

const token=localStorage.getItem("adminToken");

const [pricingRes,accountRes,requestsRes]=await Promise.all([

fetch(
"https://api.alphabothq.com/admin/membership/pricing",
{headers:{Authorization:`Bearer ${token}`}}
),

fetch(
"https://api.alphabothq.com/admin/membership/payment-account",
{headers:{Authorization:`Bearer ${token}`}}
),

fetch(
"https://api.alphabothq.com/admin/membership/payments",
{headers:{Authorization:`Bearer ${token}`}}
)

]);

const pricing=await pricingRes.json();
const account=await accountRes.json();
const requests=await requestsRes.json();

if(pricingRes.ok){

setSettings(prev=>({
...prev,

membershipSilverPrice:
pricing.silver?.price ??
pricing.membershipSilverPrice ??
1000,

membershipGoldPrice:
pricing.gold?.price ??
pricing.membershipGoldPrice ??
2000,

membershipDurationDays:
pricing.silver?.durationDays ??
pricing.membershipDurationDays ??
30

}));

}

if(accountRes.ok){

const a =
account.bank ||
account.account ||
account.paymentAccount ||
account;

setSettings(prev=>({
...prev,

paymentBankName:
a.bankName ?? "",

paymentAccountName:
a.accountName ?? "",

paymentAccountNumber:
a.accountNumber ?? ""

}));

}

if(requestsRes.ok){
setMembershipRequests(requests.requests || []);
}

}catch(error){

console.error("Membership admin load error:",error);

}

};


const saveMembershipPricing=async()=>{

const token=localStorage.getItem("adminToken");

const res=await fetch(
"https://api.alphabothq.com/admin/membership/pricing",
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
silverPrice:Number(settings.membershipSilverPrice),
goldPrice:Number(settings.membershipGoldPrice),
durationDays:Number(settings.membershipDurationDays)
})
}
);

const data=await res.json();

setMembershipMessage(
res.ok ? "✅ Membership pricing updated" :
data.message || "Unable to update pricing"
);

};


const savePaymentAccount=async()=>{

const token=localStorage.getItem("adminToken");

const res=await fetch(
"https://api.alphabothq.com/admin/membership/payment-account",
{
method:"PUT",
headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},
body:JSON.stringify({
bankName:settings.paymentBankName,
accountName:settings.paymentAccountName,
accountNumber:settings.paymentAccountNumber
})
}
);

const data=await res.json();

setMembershipMessage(
res.ok ? "✅ Payment account updated" :
data.message || "Unable to update payment account"
);

};


const reviewMembership=async(id,action)=>{

try{

setMembershipLoading(true);

const token=localStorage.getItem("adminToken");

const res=await fetch(
`https://api.alphabothq.com/admin/membership/payments/${id}/${action}`,
{
method:"PUT",
headers:{
Authorization:`Bearer ${token}`
}
}
);

const data=await res.json();

if(!res.ok){

setMembershipMessage(
data.message || "Request failed"
);

return;

}

setMembershipMessage(
action==="approve"
? "✅ Membership approved"
: "Membership payment rejected"
);

await loadMembershipAdmin();

}catch(error){

setMembershipMessage("Unable to process request");

}finally{

setMembershipLoading(false);

}

};


return(
<div className="p-4 md:p-6 space-y-6">

<h1 className="text-2xl font-bold">
⚙️ System Settings
</h1>


<p className="mt-3">
{message}
</p>


<div className="mt-5 space-y-4">


<label className="flex gap-3">
<input
type="checkbox"
checked={settings.maintenanceMode}
onChange={(e)=>setSettings({
...settings,
maintenanceMode:e.target.checked
})}
/>

Maintenance Mode
</label>


<textarea
className="border border-zinc-800 rounded-3xl p-3 w-full"
placeholder="Announcement message"
value={settings.announcement}
onChange={(e)=>setSettings({
...settings,
announcement:e.target.value
})}
/>


<label className="font-bold block">
💰 Referral Percentage (%)
</label>

<input
className="border border-zinc-800 rounded-3xl p-3 w-full"
type="number"
placeholder="Referral percentage"
value={settings.referralPercentage}
onChange={(e)=>setSettings({
...settings,
referralPercentage:Number(e.target.value)
})}
/>

<button
className="bg-black text-white px-5 py-3 rounded-3xl"
onClick={saveSettings}
>
Save Referral Percentage
</button>


<label className="font-bold block">
🏦 Provider Minimum Balance (NGN)
</label>

<input
className="border border-zinc-800 rounded-3xl p-3 w-full"
type="number"
placeholder="Provider minimum balance"
value={settings.providerMinimumBalance}
onChange={(e)=>setSettings({
...settings,
providerMinimumBalance:e.target.value
})}
/>

<button
className="bg-black text-white px-5 py-3 rounded-3xl"
onClick={saveSettings}
>
Save Minimum Balance
</button>


<section className="rounded-3xl border border-zinc-800 p-5 space-y-4">

<h2 className="text-xl font-black">
🪙 AB Coins Management
</h2>

<p className="text-sm text-zinc-500">
Control how many AB Coins users earn and the redemption value.
</p>

<label className="font-bold block">
Coins awarded per ₦100
</label>

<input
className="border border-zinc-800 rounded-2xl p-3 w-full bg-transparent"
type="number"
step="0.01"
min="0"
value={settings.abCoinsPer100Naira}
onChange={(e)=>setSettings({
...settings,
abCoinsPer100Naira:e.target.value
})}
/>

<label className="font-bold block">
Redemption coin target
</label>

<input
className="border border-zinc-800 rounded-2xl p-3 w-full bg-transparent"
type="number"
step="1"
min="1"
value={settings.abCoinsRedemptionTarget}
onChange={(e)=>setSettings({
...settings,
abCoinsRedemptionTarget:e.target.value
})}
/>

<label className="font-bold block">
Redemption reward (₦)
</label>

<input
className="border border-zinc-800 rounded-2xl p-3 w-full bg-transparent"
type="number"
step="1"
min="1"
value={settings.abCoinsRedemptionReward}
onChange={(e)=>setSettings({
...settings,
abCoinsRedemptionReward:e.target.value
})}
/>

</section>


<button
className="bg-black text-white px-5 py-3 rounded-3xl"
onClick={saveSettings}
>
Save Settings
</button>


</div>



      <section className="mt-10 space-y-6">

        <div>
          <h2 className="text-xl font-black">
            💎 Membership Management
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            Manage membership pricing, payment details and payment requests.
          </p>
        </div>

        {membershipMessage && (
          <div className="rounded-2xl border border-zinc-800 p-4 text-sm">
            {membershipMessage}
          </div>
        )}

        <div className="rounded-3xl border border-zinc-800 p-5 space-y-4">

          <h3 className="font-bold">Membership Pricing</h3>

          <input
            className="border border-zinc-800 rounded-2xl p-3 w-full bg-transparent"
            type="number"
            placeholder="Silver price"
            value={settings.membershipSilverPrice}
            onChange={(e)=>setSettings({
              ...settings,
              membershipSilverPrice:e.target.value
            })}
          />

          <input
            className="border border-zinc-800 rounded-2xl p-3 w-full bg-transparent"
            type="number"
            placeholder="Gold price"
            value={settings.membershipGoldPrice}
            onChange={(e)=>setSettings({
              ...settings,
              membershipGoldPrice:e.target.value
            })}
          />

          <input
            className="border border-zinc-800 rounded-2xl p-3 w-full bg-transparent"
            type="number"
            placeholder="Duration in days"
            value={settings.membershipDurationDays}
            onChange={(e)=>setSettings({
              ...settings,
              membershipDurationDays:e.target.value
            })}
          />

          <button
            onClick={saveMembershipPricing}
            className="bg-white text-black px-5 py-3 rounded-2xl font-bold"
          >
            Save Membership Pricing
          </button>

        </div>

        <div className="rounded-3xl border border-zinc-800 p-5 space-y-4">

          <h3 className="font-bold">🏦 Payment Account</h3>

          <input
            className="border border-zinc-800 rounded-2xl p-3 w-full bg-transparent"
            placeholder="Bank name"
            value={settings.paymentBankName}
            onChange={(e)=>setSettings({
              ...settings,
              paymentBankName:e.target.value
            })}
          />

          <input
            className="border border-zinc-800 rounded-2xl p-3 w-full bg-transparent"
            placeholder="Account name"
            value={settings.paymentAccountName}
            onChange={(e)=>setSettings({
              ...settings,
              paymentAccountName:e.target.value
            })}
          />

          <input
            className="border border-zinc-800 rounded-2xl p-3 w-full bg-transparent"
            placeholder="Account number"
            value={settings.paymentAccountNumber}
            onChange={(e)=>setSettings({
              ...settings,
              paymentAccountNumber:e.target.value
            })}
          />

          <button
            onClick={savePaymentAccount}
            className="bg-white text-black px-5 py-3 rounded-2xl font-bold"
          >
            Save Payment Account
          </button>

        </div>

        <div className="rounded-3xl border border-zinc-800 p-5">

          <h3 className="font-bold">💳 Pending Membership Payments</h3>

          {membershipRequests.length === 0 ? (
            <p className="text-sm text-zinc-500 mt-4">
              No pending membership payments.
            </p>
          ) : (

            <div className="space-y-4 mt-4">

              {membershipRequests.map((request) => (

                <div
                  key={request._id}
                  className="rounded-2xl border border-zinc-800 p-4"
                >

                  <div className="flex justify-between gap-4">

                    <div>
                      <p className="font-bold">
                        {request.user?.name || request.phone}
                      </p>

                      <p className="text-sm text-zinc-500">
                        {request.phone}
                      </p>
                    </div>

                    <span className="font-black">
                      ₦{Number(request.amount || 0).toLocaleString()}
                    </span>

                  </div>

                  <div className="mt-3 text-sm">
                    <span className="font-bold uppercase">
                      {request.tier}
                    </span>
                    <span className="text-zinc-500 ml-2">
                      {request.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">

                    <button
                      disabled={membershipLoading}
                      onClick={()=>reviewMembership(
                        request._id,
                        "approve"
                      )}
                      className="rounded-xl bg-white text-black py-3 font-bold disabled:opacity-50"
                    >
                      Approve
                    </button>

                    <button
                      disabled={membershipLoading}
                      onClick={()=>reviewMembership(
                        request._id,
                        "reject"
                      )}
                      className="rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 py-3 font-bold disabled:opacity-50"
                    >
                      Reject
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </section>

</div>
);

}
