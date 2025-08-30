// js/auth/adminauth.js

document.addEventListener('DOMContentLoaded', function() {
    // Check if admin is logged in
    if (!localStorage.getItem('adminToken')) {
        window.location.href = 'admin.html';
        return;
    }

    // Logout functionality
    document.getElementById('adminLogout').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('adminToken');
        window.location.href = 'admin.html';
    });

    // Load admin data
    loadAdminData();
});

function loadAdminData() {
    // In a real app, this would be an API call
    const adminData = {
        name: "Admin User",
        lastLogin: new Date().toLocaleString(),
        stats: {
            students: 1250,
            courses: 24,
            revenue: "₹2,85,000"
        }
    };

    // Update UI with admin data
    document.querySelector('.user-name').textContent = adminData.name;
    document.getElementById('totalStudents').textContent = adminData.stats.students.toLocaleString();
    
    // Simulate loading recent enrollments
    setTimeout(loadRecentEnrollments, 1000);
}

function loadRecentEnrollments() {
    // Mock data - in real app this would come from API
    const enrollments = [
        { id: 1, student: "Rahul Sharma", course: "Full Stack Development", date: "2023-06-15", status: "Active" },
        { id: 2, student: "Priya Patel", course: "Data Science", date: "2023-06-14", status: "Active" },
        { id: 3, student: "Amit Kumar", course: "Digital Marketing", date: "2023-06-13", status: "Pending" }
    ];

    const tableBody = document.querySelector('.data-table tbody');
    tableBody.innerHTML = enrollments.map(enrollment => `
        <tr>
            <td>${enrollment.id}</td>
            <td>${enrollment.student}</td>
            <td>${enrollment.course}</td>
            <td>${enrollment.date}</td>
            <td><span class="badge ${enrollment.status === 'Active' ? 'success' : 'warning'}">${enrollment.status}</span></td>
        </tr>
    `).join('');
}