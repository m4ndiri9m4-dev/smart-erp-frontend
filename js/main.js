const loginDiv = document.getElementById('loginDiv');
const dashboardDiv = document.getElementById('dashboardDiv');
const loginBtn = document.getElementById('loginBtn');
const clockInBtn = document.getElementById('clockInBtn');
const clockOutBtn = document.getElementById('clockOutBtn');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginMsg = document.getElementById('loginMsg');
const clockMsg = document.getElementById('clockMsg');

const userNameSpan = document.getElementById('userName');
const userRoleSpan = document.getElementById('userRole');

let currentUser = null;

const API_BASE = 'https://smart-erp-backend-nryk.onrender.com/api'; // Replace with your Render backend URL

// Login
loginBtn.addEventListener('click', async () => {
  loginMsg.textContent = '';
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    loginMsg.textContent = 'Email and password required';
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();

    if (res.ok) {
      currentUser = data.user;
      userNameSpan.textContent = currentUser.name;
      userRoleSpan.textContent = currentUser.role;

      loginDiv.classList.add('d-none');
      dashboardDiv.classList.remove('d-none');
    } else {
      loginMsg.textContent = data.message || 'Login failed';
    }
  } catch (err) {
    loginMsg.textContent = 'Server error';
    console.error(err);
  }
});

// Clock In
clockInBtn.addEventListener('click', async () => {
  clockMsg.textContent = '';
  if (!currentUser) return;

  try {
    const res = await fetch(`${API_BASE}/attendance/clockin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser._id, time: new Date() })
    });
    const data = await res.json();
    if (res.ok) clockMsg.textContent = data.message;
    else clockMsg.textContent = 'Failed to clock in';
  } catch (err) {
    clockMsg.textContent = 'Server error';
    console.error(err);
  }
});

// Clock Out
clockOutBtn.addEventListener('click', async () => {
  clockMsg.textContent = '';
  if (!currentUser) return;

  try {
    const res = await fetch(`${API_BASE}/attendance/clockout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser._id, time: new Date() })
    });
    const data = await res.json();
    if (res.ok) clockMsg.textContent = data.message;
    else clockMsg.textContent = 'Failed to clock out';
  } catch (err) {
    clockMsg.textContent = 'Server error';
    console.error(err);
  }
});
