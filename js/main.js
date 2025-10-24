const API_BASE_URL = "https://smart-erp-backend-nryk.onrender.com"; // your backend URL

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed!");
      return;
    }

    // Save user info in localStorage
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);

    // Redirect based on role
    if (data.user.role === "admin") window.location.href = "admin-dashboard.html";
    else if (data.user.role === "manager") window.location.href = "manager-dashboard.html";
    else if (data.user.role === "employee") window.location.href = "employee.html";

  } catch (err) {
    console.error(err);
    alert("Error connecting to server.");
  }
});
