const API_BASE_URL = 'https://smart-erp-backend-nryk.onrender.com';

document.getElementById("loginForm")?.addEventListener("submit", async e => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message || "Login failed");

    localStorage.setItem("userRole", data.user.role);
    localStorage.setItem("userEmail", data.user.email);

    if (data.user.role === "admin") window.location.href = "admin-dashboard.html";
    if (data.user.role === "manager") window.location.href = "manager-dashboard.html";
    if (data.user.role === "employee") window.location.href = "employee.html";
  } catch (err) {
    console.error(err);
    alert("Server error");
  }
});

// Clock in/out
async function clockIn() {
  const email = localStorage.getItem("userEmail");
  await fetch(`${API_BASE_URL}/api/attendance/clockin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: email })
  });
  document.getElementById("clockStatus").textContent = "Clocked in";
}

async function clockOut() {
  const email = localStorage.getItem("userEmail");
  await fetch(`${API_BASE_URL}/api/attendance/clockout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: email })
  });

  document.getElementById("clockStatus").textContent = "Clocked out";

  const projects = await fetch(`${API_BASE_URL}/api/projects`).then(res => res.json());
  console.log("Projects:", projects);
}
