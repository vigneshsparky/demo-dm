// js/modules/admin/coursemanagement.js

document.addEventListener('DOMContentLoaded', function() {
    // Check URL for action parameter
    const urlParams = new URLSearchParams(window.location.search);
    const action = urlParams.get('action');
    
    if (action === 'add' || action === 'edit') {
        showCourseForm();
    } else {
        loadCourses();
    }
    
    // Setup event listeners
    document.getElementById('cancelCourseForm').addEventListener('click', hideCourseForm);
    document.getElementById('courseForm').addEventListener('submit', handleCourseSubmit);
    document.getElementById('courseSearch').addEventListener('input', filterCourses);
    document.getElementById('prevPage').addEventListener('click', goToPrevPage);
    document.getElementById('nextPage').addEventListener('click', goToNextPage);
});

let currentPage = 1;
const coursesPerPage = 10;
let allCourses = [];

function loadCourses() {
    // Simulate API call
    setTimeout(() => {
        allCourses = [
            { id: 1, title: "Full Stack Development", category: "development", duration: 12, students: 245, status: "active", price: 15000 },
            { id: 2, title: "Data Science Fundamentals", category: "development", duration: 16, students: 180, status: "active", price: 18000 },
            { id: 3, title: "UI/UX Design", category: "design", duration: 8, students: 120, status: "active", price: 12000 }
        ];
        
        renderCourses(allCourses);
    }, 800);
}

function renderCourses(courses) {
    const tableBody = document.querySelector('#courseList tbody');
    tableBody.innerHTML = courses.map(course => `
        <tr>
            <td>${course.id}</td>
            <td>
                <strong>${course.title}</strong>
                <div class="text-muted">₹${course.price.toLocaleString()}</div>
            </td>
            <td>${course.category.charAt(0).toUpperCase() + course.category.slice(1)}</td>
            <td>${course.duration} weeks</td>
            <td>${course.students}</td>
            <td><span class="badge ${course.status === 'active' ? 'success' : 'warning'}">${course.status}</span></td>
            <td>
                <button class="btn-icon btn-edit" data-id="${course.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-icon btn-delete" data-id="${course.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    // Add event listeners to action buttons
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => editCourse(btn.dataset.id));
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => deleteCourse(btn.dataset.id));
    });
}

function showCourseForm(course = null) {
    document.getElementById('courseList').style.display = 'none';
    const formContainer = document.getElementById('courseFormContainer');
    formContainer.style.display = 'block';
    
    if (course) {
        // Fill form for editing
        document.getElementById('courseId').value = course.id;
        document.getElementById('courseTitle').value = course.title;
        document.getElementById('courseCategory').value = course.category;
        document.getElementById('courseDescription').value = course.description || '';
        document.getElementById('courseDuration').value = course.duration;
        document.getElementById('coursePrice').value = course.price;
    } else {
        // Reset form for new course
        document.getElementById('courseForm').reset();
    }
}

function hideCourseForm() {
    document.getElementById('courseList').style.display = 'block';
    document.getElementById('courseFormContainer').style.display = 'none';
    window.history.pushState({}, '', 'coursemanagement.html');
}

function handleCourseSubmit(e) {
    e.preventDefault();
    
    const courseData = {
        id: document.getElementById('courseId').value,
        title: document.getElementById('courseTitle').value,
        category: document.getElementById('courseCategory').value,
        description: document.getElementById('courseDescription').value,
        duration: document.getElementById('courseDuration').value,
        price: document.getElementById('coursePrice').value,
        status: 'active'
    };
    
    // Simulate API call
    setTimeout(() => {
        alert(`Course ${courseData.id ? 'updated' : 'added'} successfully!`);
        hideCourseForm();
        loadCourses();
    }, 800);
}

function editCourse(id) {
    const course = allCourses.find(c => c.id == id);
    if (course) {
        window.history.pushState({}, '', `coursemanagement.html?action=edit&id=${id}`);
        showCourseForm(course);
    }
}

function deleteCourse(id) {
    if (confirm('Are you sure you want to delete this course?')) {
        // Simulate API call
        setTimeout(() => {
            alert('Course deleted successfully!');
            loadCourses();
        }, 800);
    }
}

function filterCourses() {
    const searchTerm = document.getElementById('courseSearch').value.toLowerCase();
    const filtered = allCourses.filter(course => 
        course.title.toLowerCase().includes(searchTerm) || 
        course.category.toLowerCase().includes(searchTerm)
    );
    renderCourses(filtered);
}

function goToPrevPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePagination();
    }
}

function goToNextPage() {
    const totalPages = Math.ceil(allCourses.length / coursesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        updatePagination();
    }
}

function updatePagination() {
    const start = (currentPage - 1) * coursesPerPage;
    const end = start + coursesPerPage;
    const paginatedCourses = allCourses.slice(start, end);
    
    renderCourses(paginatedCourses);
    document.querySelector('.page-info').textContent = `Page ${currentPage} of ${Math.ceil(allCourses.length / coursesPerPage)}`;
}