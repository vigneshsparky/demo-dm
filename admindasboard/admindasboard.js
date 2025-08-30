// js/modules/admin/admindashboard.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.admin-sidebar');
    
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
    });

    // Initialize chart (example using Chart.js if included)
    if (typeof Chart !== 'undefined') {
        initDashboardChart();
    }

    // Load stats
    loadDashboardStats();
});

function initDashboardChart() {
    const ctx = document.getElementById('dashboardChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'New Students',
                data: [65, 59, 80, 81, 56, 72],
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: 'rgba(37, 99, 235, 1)',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function loadDashboardStats() {
    // Simulate API call
    setTimeout(() => {
        const stats = {
            students: 1250,
            courses: 24,
            revenue: "₹2,85,000",
            pending: 32
        };
        
        // Update stats cards
        document.getElementById('totalStudents').textContent = stats.students.toLocaleString();
        document.getElementById('totalCourses').textContent = stats.courses;
        document.getElementById('monthlyRevenue').textContent = stats.revenue;
        document.getElementById('pendingApprovals').textContent = stats.pending;
    }, 800);
}