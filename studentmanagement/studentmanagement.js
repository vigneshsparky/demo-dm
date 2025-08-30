// js/modules/admin/studentmanagement.js

document.addEventListener('DOMContentLoaded', function() {
    loadStudents();
    
    // Setup event listeners
    document.getElementById('studentSearch').addEventListener('input', filterStudents);
    document.getElementById('studentFilter').addEventListener('change', filterStudents);
    document.getElementById('prevStudentPage').addEventListener('click', goToPrevStudentPage);
    document.getElementById('nextStudentPage').addEventListener('click', goToNextStudentPage);
});

let currentStudentPage = 1;
let allStudents = [];

function loadStudents() {
    // Simulate API call
    setTimeout(() => {
        allStudents = [
            { 
                id: 1, 
                name: "Rahul Sharma", 
                email: "rahul@example.com", 
                avatar: "../images/students/student1.jpg",
                courses: 3, 
                joined: "2023-01-15", 
                status: "active" 
            },
            { 
                id: 2, 
                name: "Priya Patel", 
                email: "priya@example.com", 
                avatar: "../images/students/student2.jpg",
                courses: 2, 
                joined: "2023-02-20", 
                status: "active" 
            },
            { 
                id: 3, 
                name: "Amit Kumar", 
                email: "amit@example.com", 
                avatar: "../images/students/student3.jpg",
                courses: 1, 
                joined: "2023-05-10", 
                status: "new" 
            }
        ];
        
        renderStudents(allStudents);
    }, 800);
}

function renderStudents(students) {
    const tableBody = document.querySelector('.data-table tbody');
    tableBody.innerHTML = students.map(student => `
        <tr>
            <td>${student.id}</td>
            <td>
                <div class="student-info">
                    <img src="${student.avatar}" alt="${student.name}" class="student-avatar">
                    <span>${student.name}</span>
                </div>
            </td>
            <td>${student.email}</td>
            <td>${student.courses}</td>
            <td>${new Date(student.joined).toLocaleDateString()}</td>
            <td>
                <span class="badge ${student.status === 'active' ? 'success' : 
                                     student.status === 'new' ? 'warning' : 'danger'}">
                    ${student.status}
                </span>
            </td>
            <td>
                <button class="btn-icon btn-view" data-id="${student.id}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="btn-icon btn-edit" data-id="${student.id}">
                    <i class="fas fa-edit"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    // Add event listeners to action buttons
    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', () => viewStudent(btn.dataset.id));
    });
    
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => editStudent(btn.dataset.id));
    });
}

function filterStudents() {
    const searchTerm = document.getElementById('studentSearch').value.toLowerCase();
    const filterValue = document.getElementById('studentFilter').value;
    
    let filtered = allStudents;
    
    // Apply status filter
    if (filterValue !== 'all') {
        filtered = filtered.filter(student => 
            filterValue === 'new' ? student.status === 'new' :
            filterValue === 'active' ? student.status === 'active' :
            student.status === 'inactive'
        );
    }
    
    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(student => 
            student.name.toLowerCase().includes(searchTerm) || 
            student.email.toLowerCase().includes(searchTerm)
        );
    }
    
    renderStudents(filtered);
    currentStudentPage = 1;
    updateStudentPagination();
}

function viewStudent(id) {
    const student = allStudents.find(s => s.id == id);
    if (student) {
        // In a real app, this would open a modal or new page
        alert(`Viewing student: ${student.name}\nEmail: ${student.email}\nCourses: ${student.courses}`);
    }
}

function editStudent(id) {
    const student = allStudents.find(s => s.id == id);
    if (student) {
        // In a real app, this would open an edit form
        alert(`Editing student: ${student.name}`);
    }
}

function goToPrevStudentPage() {
    if (currentStudentPage > 1) {
        currentStudentPage--;
        updateStudentPagination();
    }
}

function goToNextStudentPage() {
    const totalPages = Math.ceil(allStudents.length / coursesPerPage);
    if (currentStudentPage < totalPages) {
        currentStudentPage++;
        updateStudentPagination();
    }
}

function updateStudentPagination() {
    const start = (currentStudentPage - 1) * coursesPerPage;
    const end = start + coursesPerPage;
    const paginatedStudents = allStudents.slice(start, end);
    
    renderStudents(paginatedStudents);
    document.querySelector('.page-info').textContent = `Page ${currentStudentPage} of ${Math.ceil(allStudents.length / coursesPerPage)}`;
}