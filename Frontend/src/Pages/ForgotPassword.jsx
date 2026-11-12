
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/auth";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      navigate("/reset-password", {
        state: { email: email.trim().toLowerCase() },
        replace: true
      });
    } catch (error) {
      setMessage(error.message || "Unable to request password reset.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF9F4] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[#E5F0DF] bg-white p-8 shadow-lg">
        <Link to="/login" className="font-semibold text-[#47764B]">← Back to Login</Link>
        <div className="my-7 text-center">
          <div className="text-5xl">🔑</div>
          <h1 className="mt-3 text-3xl font-bold text-[#304632]">Forgot Password?</h1>
          <p className="mt-2 text-gray-600">Enter your registered email to request a reset OTP.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="Registered email address"
            className="w-full rounded-xl border border-[#D5E2D0] px-4 py-3"
          />
          {message && <p role="status" className="text-sm text-red-600">{message}</p>}
          <button disabled={loading} className="w-full rounded-xl bg-[#47764B] py-3 font-semibold text-white disabled:opacity-60">
            {loading ? "Sending..." : "Send Reset OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
