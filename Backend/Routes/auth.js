
import api from "./api.js";

export const API_URL = "/auth";

export function saveSession(data) {
  localStorage.setItem("smartSakhiToken", data.token);
  localStorage.setItem("smartSakhiUser", JSON.stringify(data.user));
}

export function logout() {
  localStorage.removeItem("smartSakhiToken");
  localStorage.removeItem("smartSakhiUser");
  window.location.href = "/login";
}

export async function getCurrentUser() {
  const token = localStorage.getItem("smartSakhiToken");

  if (!token) return null;

  try {
    const response = await api.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    localStorage.setItem(
      "smartSakhiUser",
      JSON.stringify(response.data.user)
    );

    return response.data.user;
  } catch (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("smartSakhiToken");
      localStorage.removeItem("smartSakhiUser");
    }

    console.error(
      "Unable to fetch user:",
      error.response?.data?.message || error.message
    );

    return null;
  }
}
