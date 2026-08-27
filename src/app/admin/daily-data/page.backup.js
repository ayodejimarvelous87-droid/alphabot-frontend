"use client";

import {useEffect,useState} from "react";

const API =
  "https://api.alphabothq.com/admin/daily-data/plans";

const emptyForm = {
  name:"",
  network:"MTN",
  provider:"vtu",
  variationId:"",
  dailyDataLimit:"",
  durationDays:"",
  sellingPrice:"",
  description:"",
  active:true
};

export default function AdminDailyData(){

  const [plans,setPlans] = useState([]);
  const [form,setForm] = useState(emptyForm);
  const [editingId,setEditingId] = useState(null);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const [message,setMessage] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("adminToken")
      : null;


  const loadPlans = async()=>{

    setLoading(true);

    try{

      const res = await fetch(API,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      const data = await res.json();

      if(!res.ok){
        throw new Error(
          data.message || "Failed to load daily data plans"
        );
      }

      setPlans(
        Array.isArray(data)
          ? data
          : data.plans || []
      );

    }catch(error){

      console.log("DAILY DATA PLANS LOAD ERROR:",error);

      setMessage(
        `❌ ${error.message}`
      );

    }finally{

      setLoading(false);

    }

  };


  useEffect(()=>{

    loadPlans();

  },[]);


  const updateField=(name,value)=>{

    setForm(prev=>({
      ...prev,
      [name]:value
    }));

  };


  const resetForm=()=>{

    setForm(emptyForm);
    setEditingId(null);

  };


  const savePlan=async(e)=>{

    e.preventDefault();

    setSaving(true);
    setMessage("");

    try{

      const payload = {
        name:form.name.trim(),
        network:form.network,
        provider:form.provider,
        variationId:form.variationId.trim(),
        dailyDataLimit:form.dailyDataLimit.trim(),
        durationDays:Number(form.durationDays),
        sellingPrice:Number(form.sellingPrice),
        description:form.description.trim(),
        active:Boolean(form.active)
      };


      if(
        !payload.name ||
        !payload.network ||
        !payload.provider ||
        !payload.variationId ||
        !payload.dailyDataLimit ||
        !payload.durationDays ||
        !payload.sellingPrice
      ){

        throw new Error(
          "Please complete all required fields"
        );

      }


      const url = editingId
        ? `${API}/${editingId}`
        : API;

      const method = editingId
        ? "PATCH"
        : "POST";


      const res = await fetch(url,{

        method,

        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
        },

        body:JSON.stringify(payload)

      });


      const data = await res.json();


      if(!res.ok){

        throw new Error(
          data.message ||
          "Failed to save plan"
        );

      }


      setMessage(
        editingId
          ? "✅ Daily data plan updated"
          : "✅ Daily data plan created"
      );


      resetForm();

      await loadPlans();

    }catch(error){

      console.log(
        "DAILY DATA PLAN SAVE ERROR:",
        error
      );

      setMessage(
        `❌ ${error.message}`
      );

    }finally{

      setSaving(false);

    }

  };


  const editPlan=(plan)=>{

    setEditingId(plan._id);

    setForm({
      name:plan.name || "",
      network:plan.network || "MTN",
      provider:plan.provider || "vtu",
      variationId:plan.variationId || "",
      dailyDataLimit:plan.dailyDataLimit || "",
      durationDays:plan.durationDays || "",
      sellingPrice:plan.sellingPrice || "",
      description:plan.description || "",
      active:
        plan.active !== false
    });

    window.scrollTo({
      top:0,
      behavior:"smooth"
    });

  };


  const deletePlan=async(id)=>{

    if(!confirm(
      "Delete this daily data plan?"
    )){
      return;
    }


    try{

      const res = await fetch(
        `${API}/${id}`,
        {
          method:"DELETE",
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      const data = await res.json();


      if(!res.ok){

        throw new Error(
          data.message ||
          "Failed to delete plan"
        );

      }


      setMessage(
        "✅ Daily data plan deleted"
      );

      await loadPlans();

    }catch(error){

      console.log(
        "DAILY DATA PLAN DELETE ERROR:",
        error
      );

      setMessage(
        `❌ ${error.message}`
      );

    }

  };


  const toggleActive=async(plan)=>{

    try{

      const res = await fetch(
        `${API}/${plan._id}`,
        {
          method:"PATCH",
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          },
          body:JSON.stringify({
            active:!plan.active
          })
        }
      );


      const data = await res.json();


      if(!res.ok){

        throw new Error(
          data.message ||
          "Failed to update plan"
        );

      }


      setMessage(
        plan.active
          ? "⏸️ Plan deactivated"
          : "▶️ Plan activated"
      );

      await loadPlans();

    }catch(error){

      console.log(
        "DAILY DATA ACTIVE ERROR:",
        error
      );

      setMessage(
        `❌ ${error.message}`
      );

    }

  };


  const inputClass =
    "w-full bg-[#050505] border border-zinc-800 rounded-xl p-3 text-white outline-none focus:border-zinc-500";

  const labelClass =
    "block text-sm font-semibold text-zinc-300 mb-2";


  return (

    <div className="p-4 md:p-6 space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          📅 Daily Data Plans
        </h1>

        <p className="text-zinc-500 mt-2">
          Create and manage recurring daily data subscription plans.
        </p>

      </div>


      {message && (

        <div className="bg-[#18181B] border border-zinc-800 rounded-xl p-4">
          {message}
        </div>

      )}


      <form
        onSubmit={savePlan}
        className="bg-[#18181B] border border-zinc-800 rounded-2xl p-5 md:p-6"
      >

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-xl font-bold">
            {editingId
              ? "✏️ Edit Daily Data Plan"
              : "➕ Create Daily Data Plan"}
          </h2>

          {editingId && (

            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-zinc-400 hover:text-white"
            >
              Cancel edit
            </button>

          )}

        </div>


        <div className="grid md:grid-cols-2 gap-4">


          <div>

            <label className={labelClass}>
              Plan Name *
            </label>

            <input
              className={inputClass}
              placeholder="MTN Daily 500MB"
              value={form.name}
              onChange={e=>
                updateField("name",e.target.value)
              }
            />

          </div>


          <div>

            <label className={labelClass}>
              Network *
            </label>

            <select
              className={inputClass}
              value={form.network}
              onChange={e=>
                updateField("network",e.target.value)
              }
            >

              <option value="MTN">MTN</option>
              <option value="GLO">GLO</option>
              <option value="AIRTEL">Airtel</option>
              <option value="9MOBILE">9mobile</option>

            </select>

          </div>


          <div>

            <label className={labelClass}>
              Provider *
            </label>

            <select
              className={inputClass}
              value={form.provider}
              onChange={e=>
                updateField("provider",e.target.value)
              }
            >

              <option value="vtu">VTU</option>
              <option value="blitzpay">BlitzPay</option>
              <option value="oplug">Oplug</option>
              <option value="gsubz">GSUBZ</option>

            </select>

          </div>


          <div>

            <label className={labelClass}>
              Provider Variation ID *
            </label>

            <input
              className={inputClass}
              placeholder="e.g. 12345"
              value={form.variationId}
              onChange={e=>
                updateField(
                  "variationId",
                  e.target.value
                )
              }
            />

          </div>


          <div>

            <label className={labelClass}>
              Daily Data Limit *
            </label>

            <input
              className={inputClass}
              placeholder="500MB"
              value={form.dailyDataLimit}
              onChange={e=>
                updateField(
                  "dailyDataLimit",
                  e.target.value
                )
              }
            />

          </div>


          <div>

            <label className={labelClass}>
              Duration (Days) *
            </label>

            <input
              type="number"
              min="1"
              className={inputClass}
              placeholder="30"
              value={form.durationDays}
              onChange={e=>
                updateField(
                  "durationDays",
                  e.target.value
                )
              }
            />

          </div>


          <div>

            <label className={labelClass}>
              Selling Price (₦) *
            </label>

            <input
              type="number"
              min="1"
              className={inputClass}
              placeholder="5000"
              value={form.sellingPrice}
              onChange={e=>
                updateField(
                  "sellingPrice",
                  e.target.value
                )
              }
            />

          </div>


          <div>

            <label className={labelClass}>
              Status
            </label>

            <label className="flex items-center gap-3 mt-3 cursor-pointer">

              <input
                type="checkbox"
                checked={form.active}
                onChange={e=>
                  updateField(
                    "active",
                    e.target.checked
                  )
                }
                className="w-5 h-5"
              />

              <span>
                Active
              </span>

            </label>

          </div>


          <div className="md:col-span-2">

            <label className={labelClass}>
              Description
            </label>

            <textarea
              className={inputClass}
              rows="3"
              placeholder="Receive 500MB every day for 30 days."
              value={form.description}
              onChange={e=>
                updateField(
                  "description",
                  e.target.value
                )
              }
            />

          </div>

        </div>


        <div className="flex gap-3 mt-6">

          <button
            type="submit"
            disabled={saving}
            className="bg-white text-black rounded-xl px-6 py-3 font-bold disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : editingId
                ? "Update Plan"
                : "Create Plan"}
          </button>


          {editingId && (

            <button
              type="button"
              onClick={resetForm}
              className="bg-zinc-800 text-white rounded-xl px-6 py-3"
            >
              Cancel
            </button>

          )}

        </div>

      </form>


      <div className="bg-[#18181B] border border-zinc-800 rounded-2xl overflow-hidden">

        <div className="p-5 border-b border-zinc-800">

          <h2 className="text-xl font-bold">
            📋 Existing Plans
          </h2>

        </div>


        {loading ? (

          <div className="p-6 text-zinc-500">
            Loading plans...
          </div>

        ) : plans.length === 0 ? (

          <div className="p-6 text-zinc-500">
            No daily data plans created yet.
          </div>

        ) : (

          <div className="divide-y divide-zinc-800">

            {plans.map(plan=>(

              <div
                key={plan._id}
                className="p-5"
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">


                  <div className="space-y-1">

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="font-bold text-lg">
                        {plan.name}
                      </h3>

                      <span className="text-xs bg-zinc-800 px-2 py-1 rounded-lg">
                        {plan.network}
                      </span>

                      <span className="text-xs bg-zinc-800 px-2 py-1 rounded-lg">
                        {plan.provider}
                      </span>

                      <span
                        className={
                          plan.active
                            ? "text-xs bg-green-900/40 text-green-400 px-2 py-1 rounded-lg"
                            : "text-xs bg-red-900/40 text-red-400 px-2 py-1 rounded-lg"
                        }
                      >
                        {plan.active
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </div>


                    <p className="text-zinc-400">
                      {plan.dailyDataLimit}
                      {" per day · "}
                      {plan.durationDays}
                      {" days"}
                    </p>


                    <p className="font-bold">
                      ₦{Number(
                        plan.sellingPrice || 0
                      ).toLocaleString()}
                    </p>


                    <p className="text-xs text-zinc-600">
                      Variation ID: {plan.variationId}
                    </p>


                    {plan.description && (

                      <p className="text-sm text-zinc-500">
                        {plan.description}
                      </p>

                    )}

                  </div>


                  <div className="flex flex-wrap gap-2">

                    <button
                      onClick={()=>
                        toggleActive(plan)
                      }
                      className="bg-zinc-800 rounded-xl px-4 py-2"
                    >
                      {plan.active
                        ? "Deactivate"
                        : "Activate"}
                    </button>


                    <button
                      onClick={()=>
                        editPlan(plan)
                      }
                      className="bg-white text-black rounded-xl px-4 py-2 font-semibold"
                    >
                      Edit
                    </button>


                    <button
                      onClick={()=>
                        deletePlan(plan._id)
                      }
                      className="bg-red-900/40 text-red-400 rounded-xl px-4 py-2"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );

}
