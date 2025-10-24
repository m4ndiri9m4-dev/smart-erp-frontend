// Static charts for admin dashboard
const ctx1 = document.getElementById('attendanceChart');
if (ctx1) {
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['Project Alpha', 'Project Beta', 'Project Gamma'],
      datasets: [{ 
        label: 'Attendance %',
        data: [95, 88, 92],
        backgroundColor: ['#0d6efd','#198754','#ffc107']
      }]
    },
    options: { animation: false, plugins:{legend:{display:false}} }
  });
}

const ctx2 = document.getElementById('salesChart');
if (ctx2) {
  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: ['Project Alpha','Project Beta','Project Gamma'],
      datasets:[
        { label:'Target', data:[10000,8000,7000], backgroundColor:'#6c757d' },
        { label:'Actual', data:[9500,7800,6900], backgroundColor:'#0d6efd' }
      ]
    },
    options: { animation:false, responsive:true }
  });
}
