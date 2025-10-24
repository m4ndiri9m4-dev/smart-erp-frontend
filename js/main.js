const API_BASE_URL = 'https://smart-erp-backend-nryk.onrender.com'; // <-- Your Render backend URL


function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

document.getElementById("loginForm")?.addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      const error = await res.json();
      return alert("Login failed: " + (error.message || "Invalid credentials"));
    }

    const data = await res.json();
    // Save token and role
    localStorage.setItem("token", data.token);
    localStorage.setItem("userRole", data.user.role);

    // Redirect based on role
    switch (data.user.role) {
      case "admin": window.location.href = "admin-dashboard.html"; break;
      case "manager": window.location.href = "manager-dashboard.html"; break;
      case "employee": window.location.href = "employee.html"; break;
    }

  } catch (err) {
    console.error(err);
    alert("Login error. Try again later.");
  }
  
  await fetch(`${API_BASE_URL}/api/attendance/clockin`, { method: "POST", headers: { "Authorization": `Bearer ${token}` }});
await fetch(`${API_BASE_URL}/api/attendance/clockout`, { method: "POST", headers: { "Authorization": `Bearer ${token}` }});

});
