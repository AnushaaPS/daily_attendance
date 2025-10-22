// === common.js ===

// Paste your Google Apps Script Web App URL below
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwcDpPb0Zapi6F2AvEDo_CvVfRvSptwq9vtwXVjSVWNPlJyLwkTGGZuQWjtQ_8rkTzn_A/exec";

/* === API Helper === */
async function apiFetch(payload) {
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    body: JSON.stringify(payload),
    //headers: { "Content-Type": "application/json" }
  });
  return res.json();
}

/* === Login & Role Helpers === */
function requireRole(role) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) {
    location.href = "index.html";
    return null;
  }
  if (user.role !== role) {
    alert("Access Denied");
    location.href = "index.html";
    return null;
  }
  return user;
}

async function handleLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  if (!email || !password) return alert("Enter credentials");

  const res = await apiFetch({ action: "login", email, password });
  console.log("Login Response:", res); // optional, helps debug
  if (!res.success) return alert(res.message);

  localStorage.setItem("user", JSON.stringify(res));

  // Normalize role to lowercase for consistent matching
  const role = (res.role || "").trim().toLowerCase();

if (role === "staff") location.href = "staff.html";
    else if (role === "faculty") location.href = "faculty.html";
    else if (role === "hod") location.href = "hod.html";
    else if (role === "principal") location.href = "principal.html";
    else if (role === "office") location.href = "office.html";
    else {
      alert("Unknown role: " + res.role);
      location.href = "index.html";
}

}

function logout() {
  localStorage.removeItem("user");
  location.href = "index.html";
}
