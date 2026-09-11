"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import PhoneInput from "@/components/PhoneInput";
import Toast from "@/components/Toast";
import { startAuthentication } from "@simplewebauthn/browser";

export default function Auth() {
  const searchParams = useSearchParams();
  const initialMode =
    searchParams.get("mode") === "register" ? "register" : "login";

  const [mode, setMode] = useState(initialMode);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    transactionPin: "",
    confirmPin: "",
    referralCode: "",
  });

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);

  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showPinPrompt, setShowPinPrompt] = useState(false);

  useEffect(() => {
    const ref = searchParams.get("ref");

    if (ref) {
      setForm((prev) => ({
        ...prev,
        referralCode: ref,
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    setMessage("");
    setToast("");
  }, [mode]);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setMessage("");
    setToast("");
  };

  const checkPinAfterLogin = async () => {
    try {
      const authToken = localStorage.getItem("token");

      const res = await fetch(
        "https://api.alphabothq.com/pin/status",
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok && !data.hasPin) {
        setShowPinPrompt(true);
        return true;
      }
    } catch (error) {
      console.error("PIN STATUS CHECK ERROR:", error);
    }

    return false;
  };

  const continueToDashboard = () => {
    window.location.href = "/dashboard";
  };

  const biometricLogin = async () => {
    try {
      if (!phone) {
        setMessage("Enter your phone number first");
        return;
      }

      setLoading(true);
      setMessage("Starting fingerprint login...");

      const optionsRes = await fetch(
        "https://api.alphabothq.com/biometric/login/options",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
          }),
        }
      );

      const options = await optionsRes.json();

      if (!optionsRes.ok) {
        throw new Error(
          options.message || "Fingerprint login is not available"
        );
      }

      setMessage("Touch your fingerprint sensor...");

      const authenticationResponse = await startAuthentication({
        optionsJSON: options,
      });

      const verifyRes = await fetch(
        "https://api.alphabothq.com/biometric/login/verify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            ...authenticationResponse,
          }),
        }
      );

      const data = await verifyRes.json();

      if (!verifyRes.ok) {
        throw new Error(
          data.message || "Fingerprint login failed"
        );
      }

      if (!data.token) {
        throw new Error(
          "Fingerprint login did not return a token"
        );
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.removeItem("biometricToken");

      setMessage("");
      setToast("✅ Fingerprint login successful");
      setLoading(false);

      setTimeout(async () => {
        const pinPromptShown = await checkPinAfterLogin();

        if (!pinPromptShown) {
          continueToDashboard();
        }
      }, 700);
    } catch (error) {
      console.error("BIOMETRIC LOGIN ERROR:", error);

      setLoading(false);
      setMessage(
        error.message || "Fingerprint login failed"
      );
    }
  };

  const login = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await fetch(
        "https://api.alphabothq.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone,
            password,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Login failed");
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setToast("✅ Login successful");
        setLoading(false);

        setTimeout(async () => {
          const pinPromptShown = await checkPinAfterLogin();

          if (!pinPromptShown) {
            continueToDashboard();
          }
        }, 500);
      } else {
        setMessage(data.message || "Login failed");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("LOGIN ERROR:", error);
      setMessage(error.message || "Login failed");
    }
  };

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendOTP = async () => {
    const firstName = form.firstName.trim();
    const lastName = form.lastName.trim();

    if (
      !firstName ||
      !lastName ||
      !form.phone ||
      !form.email ||
      !form.password ||
      !form.transactionPin ||
      !form.confirmPin
    ) {
      setMessage("Please fill all required fields");
      return;
    }

    if (!/^\\d{4}$/.test(form.transactionPin)) {
      setMessage("Transaction PIN must be exactly 4 digits.");
      return;
    }

    if (form.transactionPin !== form.confirmPin) {
      setMessage("Transaction PINs do not match.");
      return;
    }

    if (firstName.length < 3 || lastName.length < 3) {
      setMessage(
        "First name and last name must be at least 3 characters."
      );
      return;
    }

    const namePattern =
      /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ -][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;

    if (
      !namePattern.test(firstName) ||
      !namePattern.test(lastName)
    ) {
      setMessage(
        "Names can only contain letters, spaces, or hyphens."
      );
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://api.alphabothq.com/users/send-registration-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,
            name: `${firstName} ${lastName}`,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setToast("✅ OTP sent to your email");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Failed to send OTP");
    }

    setLoading(false);
  };

  const verifyOTP = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        "https://api.alphabothq.com/users/verify-registration-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phone: form.phone,
            otp,
            partner: form.referralCode,
          }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setVerified(true);
        setToast("✅ Email verified successfully");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("OTP verification failed");
    }

    setLoading(false);
  };

  const register = async () => {
    if (!verified) {
      setMessage("Verify OTP first");
      return;
    }

    setToast("✅ Registration completed");

    setTimeout(() => {
      setMode("login");
      setOtpSent(false);
      setVerified(false);
      setOtp("");
      setPassword("");
      setToast("");
    }, 1500);
  };

  const inputStyle =
    "w-full mt-4 p-3.5 rounded-xl bg-white dark:bg-[#050505] text-zinc-950 dark:text-white border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 outline-none transition placeholder:text-zinc-400 dark:placeholder:text-zinc-500";

  return (
    <main className="
      min-h-screen
      bg-zinc-50 dark:bg-[#050505]
      text-zinc-950 dark:text-white
      flex items-center justify-center
      px-6 py-10
    ">

      <div className="w-full max-w-md">

        {/* BRAND STATEMENT */}
        <div className="text-center mb-7">
          <div className="
            text-3xl font-black tracking-tight
            bg-gradient-to-r from-zinc-950 via-zinc-500 to-zinc-950
            dark:from-white dark:via-zinc-300 dark:to-white
            bg-clip-text text-transparent
          ">
            AlphaBot
          </div>

          <div className="
            mt-1 text-sm font-semibold tracking-[0.22em]
            uppercase text-zinc-500 dark:text-zinc-400
          ">
            Powering Possibilities
          </div>
        </div>

        <div className="
        auth-energy-card
        relative w-full max-w-md
        rounded-3xl p-8
        bg-gradient-to-b from-white to-zinc-50
        dark:from-[#18181B] dark:to-[#101012]
        shadow-[0_20px_50px_rgba(0,0,0,0.08)]
        dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]
      ">

        <div className="relative z-10">

        {/* LOGO */}

        <div className="flex justify-center mb-6">
          <div className="
            w-14 h-14 rounded-2xl
            bg-zinc-100 dark:bg-black
            border border-zinc-300 dark:border-zinc-700
            flex items-center justify-center
            shadow-inner
          ">
            <span className="
              text-3xl font-black
              bg-gradient-to-br from-white to-zinc-400
              bg-clip-text text-transparent
            ">
              A
            </span>
          </div>
        </div>

        {/* AUTH SWITCH */}

        <div className="
          grid grid-cols-2
          p-1
          rounded-xl
          bg-black/40
          border border-zinc-800
          mb-7
        ">
          <button
            type="button"
            onClick={() => switchMode("login")}
            className={`
              py-3 rounded-lg font-bold text-sm transition
              ${
                mode === "login"
                  ? "bg-white text-black"
                  : "text-zinc-500 hover:text-white"
              }
            `}
          >
            LOGIN
          </button>

          <button
            type="button"
            onClick={() => switchMode("register")}
            className={`
              py-3 rounded-lg font-bold text-sm transition
              ${
                mode === "register"
                  ? "bg-white text-black"
                  : "text-zinc-500 hover:text-white"
              }
            `}
          >
            REGISTER
          </button>
        </div>

        {mode === "login" ? (
          <>
            <h1 className="text-3xl font-bold text-center">
              Welcome back
            </h1>

            <p className="
              text-center text-zinc-500 dark:text-zinc-400
              mt-2 text-sm
            ">
              Login to your AlphaBot account.
            </p>

            <div className="mt-6">
              <PhoneInput
                value={phone}
                onChange={setPhone}
              />
            </div>

            <div className="relative">
              <input
                type={showLoginPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputStyle} pr-14`}
              />

              <button
                type="button"
                onClick={() =>
                  setShowLoginPassword(!showLoginPassword)
                }
                className="
                  absolute right-4 top-8
                  text-zinc-500 dark:text-zinc-400
                "
              >
                {showLoginPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <button
              onClick={login}
              disabled={loading}
              className="
                w-full mt-6
                bg-zinc-950 dark:bg-white
                text-white dark:text-black
                py-3.5 rounded-xl font-bold
                hover:scale-[1.02] transition
                disabled:opacity-50
              "
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              onClick={biometricLogin}
              disabled={loading}
              className="
                w-full mt-3
                border border-zinc-300 dark:border-zinc-700
                text-zinc-950 dark:text-white
                py-3.5 rounded-xl font-semibold
                hover:bg-zinc-100 dark:hover:bg-zinc-900 transition
                disabled:opacity-50
              "
            >
              👆 Login with Fingerprint
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-center">
              Create Account
            </h1>

            <p className="
              text-center text-zinc-500 dark:text-zinc-400
              mt-2 text-sm
            ">
              Join AlphaBot and manage your digital payments securely.
            </p>

            <p className="
              text-center text-xs text-zinc-500 mt-2
            ">
              Secure wallet • Fast payments • Digital services
            </p>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <input
                name="firstName"
                placeholder="First name"
                minLength={3}
                maxLength={40}
                autoComplete="given-name"
                value={form.firstName}
                className={inputStyle}
                onChange={update}
              />

              <input
                name="lastName"
                placeholder="Last name"
                minLength={3}
                maxLength={40}
                autoComplete="family-name"
                value={form.lastName}
                className={inputStyle}
                onChange={update}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <input
                name="email"
                type="email"
                placeholder="Email address"
                autoComplete="email"
                value={form.email}
                className={inputStyle}
                onChange={update}
              />

              <PhoneInput
                value={form.phone}
                onChange={(value) =>
                  setForm({
                    ...form,
                    phone: value,
                  })
                }
              />
            </div>

            <div className="relative mt-3">
              <input
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={form.password}
                className={`${inputStyle} pr-14`}
                onChange={update}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute right-4 top-5
                  text-zinc-500 dark:text-zinc-400
                "
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>

              <p className="text-xs text-zinc-500 mt-1 ml-1">
                Minimum 8 characters recommended
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <input
                name="transactionPin"
                type="password"
                inputMode="numeric"
                maxLength={4}
                placeholder="Transaction PIN"
                autoComplete="new-password"
                value={form.transactionPin}
                className={inputStyle}
                onChange={update}
              />

              <input
                name="confirmPin"
                type="password"
                inputMode="numeric"
                maxLength={4}
                placeholder="Confirm PIN"
                autoComplete="new-password"
                value={form.confirmPin}
                className={inputStyle}
                onChange={update}
              />
            </div>

            <p className="text-xs text-zinc-500 mt-1 ml-1">
              Your 4-digit PIN will be required to authorize transactions.
            </p>

            <input
              name="referralCode"
              value={form.referralCode}
              readOnly
              placeholder="Referral code (optional)"
              className={`${inputStyle} mt-3`}
              onChange={update}
            />

            {!otpSent ? (
              <button
                onClick={sendOTP}
                disabled={loading}
                className="
                  w-full mt-6
                  bg-zinc-950 dark:bg-white
                  text-white dark:text-black
                  py-3.5 rounded-xl font-bold
                  hover:scale-[1.02] transition
                  disabled:opacity-50
                "
              >
                {loading ? "Sending..." : "Send Verification OTP"}
              </button>
            ) : (
              <div className="mt-5">
                <input
                  placeholder="Enter 6-digit OTP"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={inputStyle}
                />

                <button
                  onClick={verifyOTP}
                  disabled={loading}
                  className="
                    w-full mt-4
                    bg-white text-black
                    py-3.5 rounded-xl font-bold
                    hover:scale-[1.02] transition
                    disabled:opacity-50
                  "
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </div>
            )}

            {verified && (
              <button
                onClick={register}
                className="
                  w-full mt-4
                  bg-zinc-950 dark:bg-zinc-200
                  text-white dark:text-black
                  py-3.5 rounded-xl font-bold
                  hover:scale-[1.02] transition
                "
              >
                Create Account
              </button>
            )}
          </>
        )}

        {message && (
          <p className="
            text-center text-sm mt-5
            text-red-400
          ">
            {message}
          </p>
        )}

        {showPinPrompt && (
          <div className="
            mt-5 p-4 rounded-xl
            border border-yellow-500/30
            bg-yellow-500/10
            text-sm
          ">
            <p className="font-semibold text-yellow-400">
              Transaction PIN required
            </p>
            <p className="text-zinc-400 mt-1">
              Set up your Transaction PIN before continuing.
            </p>

            <button
              onClick={() => {
                window.location.href = "/transaction-pin";
              }}
              className="
                w-full mt-3
                bg-yellow-400 text-black
                py-3 rounded-xl font-bold
              "
            >
              Set Transaction PIN
            </button>
          </div>
        )}
        </div>
      </div>

      {/* AUTH FOOTER */}
      <div className="text-center mt-6">
        <p className="text-xs text-zinc-400 dark:text-zinc-600">
          © 2026 AlphaBot • Powering Possibilities
        </p>
      </div>

      </div>

      <Toast
        message={toast}
        type="success"
        onClose={() => setToast("")}
      />
    </main>
  );
}
