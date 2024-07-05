// script.js
document.getElementById('courseForm').addEventListener('submit', addCourse);

function addCourse(event) {
    
    event.preventDefault();

    const courseName = document.getElementById('courseName').value;
    const coursePrice = document.getElementById('coursePrice').value;
    const courseVideos = document.getElementById('courseVideos').value;
    const courseInstructor = document.getElementById('courseInstructor').value;
    const courseCategory = document.getElementById('courseCategory').value;
    const courseImageInput = document.getElementById('courseImage');
    const courseImage = courseImageInput.files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
        const courseImageBase64 = reader.result;

        const course = {
            name: courseName,
            price: coursePrice,
            videos: courseVideos,
            instructor: courseInstructor,
            category: courseCategory,
            image: courseImageBase64
        };

        let courses = JSON.parse(localStorage.getItem('courses')) || [];
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));

        displayCourses();
    };

    if (courseImage) {
        reader.readAsDataURL(courseImage);
    }
}

function displayCourses() {
    //localStorage.clear();
    const coursesList = document.getElementById('coursesList');
    coursesList.innerHTML = '';

    let courses = JSON.parse(localStorage.getItem('courses')) || [];

    courses.forEach((course, index) => {
        const courseDiv = document.createElement('div');
        courseDiv.className = 'course';
        courseDiv.innerHTML = `
            <img src="${course.image}" alt="${course.name}">
            <div>
                <h3>${course.name}</h3>
                <p>السعر: ${course.price}</p>
                <p>عدد الفيديوهات: ${course.videos}</p>
                <p>المدرس: ${course.instructor}</p>
                <p>التصنيف: ${course.category}</p>
            </div>
        `;
        coursesList.appendChild(courseDiv);
    });
}

document.addEventListener('DOMContentLoaded', displayCourses);
