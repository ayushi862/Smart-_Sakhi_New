
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/auth";

export default function VerifyOTP() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitOTP(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/verify-registration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp })
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);
      navigate("/login", { state: { message: data.message } });
    } catch (error) {
      setMessage(error.message || "Unable to verify OTP.");
    } finally {
      setLoading(false);
    }
  }

  async function resendOTP() {
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);
      setMessage(data.message);
    } catch (error) {
      setMessage(error.message || "Unable to resend OTP.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF9F4] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[#E5F0DF] bg-white p-8 shadow-lg">
        <Link to="/signup" className="font-semibold text-[#47764B]">← Back</Link>
        <div className="mt-6 text-center">
          <div className="text-5xl">📩</div>
          <h1 className="mt-4 text-3xl font-bold text-[#304632]">Verify Your Email</h1>
          <p className="mt-3 text-gray-600">Enter the 6-digit OTP sent to your email.</p>
        </div>

        <form onSubmit={submitOTP} className="mt-7 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
            className="w-full rounded-xl border border-[#D5E2D0] px-4 py-3"
          />
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            required
            minLength={6}
            maxLength={6}
            inputMode="numeric"
            placeholder="Enter 6-digit OTP"
            className="w-full rounded-xl border border-[#D5E2D0] px-4 py-3 text-center text-xl tracking-[0.5em]"
          />

          {message && <p role="status" className="text-sm text-[#47764B]">{message}</p>}

          <button disabled={loading} className="w-full rounded-xl bg-[#47764B] py-3 font-semibold text-white disabled:opacity-60">
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <button onClick={resendOTP} type="button" className="mt-4 w-full text-sm font-semibold text-[#47764B]">
          Resend OTP
        </button>
      </div>
    </div>
  );
}
