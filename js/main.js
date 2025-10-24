function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

// Mock login redirect
document.getElementById("loginForm")?.addEventListener("submit", e => {
  e.preventDefault();
  const role = document.getElementById("role").value;
  if (role === "admin") window.location.href = "admin-dashboard.html";
  if (role === "manager") window.location.href = "manager-dashboard.html";
  if (role === "employee") window.location.href = "employee.html";
});

// Employee clock in/out (simulated)
function clockIn(){
  const time = new Date().toLocaleTimeString();
  document.getElementById("clockStatus").textContent = "Clocked in at " + time;
}
function clockOut(){
  const time = new Date().toLocaleTimeString();
  document.getElementById("clockStatus").textContent = "Clocked out at " + time;
  fetch("https://smart-erp-backend.onrender.com/api/projects")
    .then(response => response.json())
    .then(data => {
      console.log("Projects:", data);
    })
    .catch(error => {
      console.error("Error fetching projects:", error);
    });
}
