const STORAGE_KEY = 'registeredCourses';
        const form = document.getElementById('registrationForm');
        const successMessage = document.getElementById('successMessage');
        const coursesList = document.getElementById('coursesList');

        // Validation functions
        function validateStudentName(name) {
            return name.trim().length > 0;
        }

        function validateMatricNumber(matricNumber) {
            const pattern = /^[A-Z]{3}\/[A-Z]{2}\/\d{4}\/\d{3}$/;
            return pattern.test(matricNumber);
        }

        function validateCourseCode(code) {
            return code.trim().length > 0;
        }

        function validateCourseTitle(title) {
            return title.trim().length > 0;
        }

        function showError(fieldId, errorId) {
            const field = document.getElementById(fieldId);
            const error = document.getElementById(errorId);
            field.classList.add('error');
            error.classList.add('show');
        }

        function hideError(fieldId, errorId) {
            const field = document.getElementById(fieldId);
            const error = document.getElementById(errorId);
            field.classList.remove('error');
            error.classList.remove('show');
        }

        function validateForm() {
            const studentName = document.getElementById('studentName').value;
            const matricNumber = document.getElementById('matricNumber').value;
            const courseCode = document.getElementById('courseCode').value;
            const courseTitle = document.getElementById('courseTitle').value;

            let isValid = true;

            // Validate student name
            if (!validateStudentName(studentName)) {
                showError('studentName', 'nameError');
                isValid = false;
            } else {
                hideError('studentName', 'nameError');
            }

            // Validate matric number
            if (!validateMatricNumber(matricNumber)) {
                showError('matricNumber', 'matricError');
                isValid = false;
            } else {
                hideError('matricNumber', 'matricError');
            }

            // Validate course code
            if (!validateCourseCode(courseCode)) {
                showError('courseCode', 'codeError');
                isValid = false;
            } else {
                hideError('courseCode', 'codeError');
            }

            // Validate course title
            if (!validateCourseTitle(courseTitle)) {
                showError('courseTitle', 'titleError');
                isValid = false;
            } else {
                hideError('courseTitle', 'titleError');
            }

            return isValid;
        }

        // LocalStorage functions
        function getCourses() {
            const courses = localStorage.getItem(STORAGE_KEY);
            return courses ? JSON.parse(courses) : [];
        }

        function saveCourse(course) {
            const courses = getCourses();
            courses.push({
                ...course,
                id: Date.now()
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
        }

        function deleteCourse(id) {
            const courses = getCourses();
            const filteredCourses = courses.filter(course => course.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCourses));
            displayCourses();
        }

        function displayCourses() {
            const courses = getCourses();

            if (courses.length === 0) {
                coursesList.innerHTML = '<div class="empty-message">No courses registered yet</div>';
                return;
            }

            coursesList.innerHTML = courses.map(course => `
                <div class="course-item">
                    <div class="course-info">
                        <div class="course-name">${course.courseTitle}</div>
                        <div class="course-details">
                            <span><strong>Code:</strong> ${course.courseCode}</span>
                            <span><strong>Student:</strong> ${course.studentName}</span>
                            <span><strong>Matric:</strong> ${course.matricNumber}</span>
                        </div>
                    </div>
                    <button class="delete-btn" onclick="deleteCourse(${course.id})">Delete</button>
                </div>
            `).join('');
        }

        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            if (!validateForm()) {
                return;
            }

            const course = {
                studentName: document.getElementById('studentName').value,
                matricNumber: document.getElementById('matricNumber').value,
                courseCode: document.getElementById('courseCode').value,
                courseTitle: document.getElementById('courseTitle').value
            };

            saveCourse(course);
            displayCourses();

            // Show success message
            successMessage.classList.add('show');
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);

            // Reset form
            form.reset();
        });

        // Load courses on page load
        window.addEventListener('load', displayCourses);

        // Real-time validation feedback
        document.getElementById('studentName').addEventListener('blur', function() {
            if (!validateStudentName(this.value)) {
                showError('studentName', 'nameError');
            } else {
                hideError('studentName', 'nameError');
            }
        });

        document.getElementById('matricNumber').addEventListener('blur', function() {
            if (!validateMatricNumber(this.value)) {
                showError('matricNumber', 'matricError');
            } else {
                hideError('matricNumber', 'matricError');
            }
        });

        document.getElementById('courseCode').addEventListener('blur', function() {
            if (!validateCourseCode(this.value)) {
                showError('courseCode', 'codeError');
            } else {
                hideError('courseCode', 'codeError');
            }
        });

        document.getElementById('courseTitle').addEventListener('blur', function() {
            if (!validateCourseTitle(this.value)) {
                showError('courseTitle', 'titleError');
            } else {
                hideError('courseTitle', 'titleError');
            }
        });