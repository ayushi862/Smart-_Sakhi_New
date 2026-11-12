
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/auth";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword })
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Reset failed.");

      navigate("/login", { state: { message: data.message } });
    } catch (error) {
      setMessage(error.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF9F4] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[#E5F0DF] bg-white p-8 shadow-lg">
        <Link to="/login" className="font-semibold text-[#47764B]">← Login</Link>
        <div className="my-7 text-center">
          <div className="text-5xl">🔐</div>
          <h1 className="mt-3 text-3xl font-bold text-[#304632]">Reset Password</h1>
          <p className="mt-2 text-gray-600">Enter your OTP and choose a new password.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Registered email" className="w-full rounded-xl border border-[#D5E2D0] px-4 py-3" />
          <input value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} required minLength={6} maxLength={6} inputMode="numeric" placeholder="6-digit reset OTP" className="w-full rounded-xl border border-[#D5E2D0] px-4 py-3 text-center tracking-[0.5em]" />
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={8} autoComplete="new-password" placeholder="New password (8+ characters)" className="w-full rounded-xl border border-[#D5E2D0] px-4 py-3" />

          {message && <p role="alert" className="text-sm text-red-600">{message}</p>}

          <button disabled={loading} className="w-full rounded-xl bg-[#47764B] py-3 font-semibold text-white disabled:opacity-60">
            {loading ? "Updating Password..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
