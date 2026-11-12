
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../utils/auth";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Signup failed.");

      navigate("/verify-otp", { state: { email: form.email.trim().toLowerCase() } });
    } catch (error) {
      setMessage(error.message || "Cannot connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FFF9F4] px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[#E5F0DF] bg-white p-8 shadow-lg">
        <Link to="/" className="font-semibold text-[#47764B]">← Smart Sakhi</Link>
        <div className="my-7 text-center">
          <div className="text-5xl">🌿</div>
          <h1 className="mt-3 text-3xl font-bold text-[#304632]">Join Smart Sakhi</h1>
          <p className="mt-2 text-gray-600">Create your account and grow your skills.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} required maxLength={80} autoComplete="name" placeholder="Full name" className="w-full rounded-xl border border-[#D5E2D0] px-4 py-3" />
          <input name="email" type="email" value={form.email} onChange={handleChange} required autoComplete="email" placeholder="Email address" className="w-full rounded-xl border border-[#D5E2D0] px-4 py-3" />
          <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={8} autoComplete="new-password" placeholder="Password (at least 8 characters)" className="w-full rounded-xl border border-[#D5E2D0] px-4 py-3" />

          {message && <p role="alert" className="text-sm text-red-600">{message}</p>}

          <button disabled={loading} className="w-full rounded-xl bg-[#47764B] py-3 font-semibold text-white disabled:opacity-60">
            {loading ? "Sending OTP..." : "Register & Send OTP"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already registered? <Link to="/login" className="font-semibold text-[#47764B]">Login</Link>
        </p>
      </div>
    </div>
  );
}
