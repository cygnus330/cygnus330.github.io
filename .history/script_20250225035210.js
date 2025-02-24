fetch('data.json')
    .then(response => response.json())
    .then(courses => {
        const tableBody = document.getElementById('course-table');
        
        courses.forEach(course => {
            let courseCodeGroup = null;

            course.subCourses.forEach((subCourse, index) => {
                const row = document.createElement('tr');
                
                // 강의번호
                const courseCodeBtn = document.createElement('button');
                courseCodeBtn.classList.add('copy-btn');
                courseCodeBtn.innerText = '복사 ❌';
                courseCodeBtn.addEventListener('click', function() {
                    copyToClipboard(course.courseCode, this);
                });

                // 애드메일
                const emailBtn = document.createElement('button');
                emailBtn.classList.add('copy-btn');
                emailBtn.innerText = '복사 ❌';
                emailBtn.addEventListener('click', function() {
                    copyToClipboard(subCourse.email, this);
                });
                
                // 찌끄레기
                row.innerHTML = `
                    <td></td>
                    <td></td>
                    <td>${course.courseCode}</td>
                    <td>${subCourse.section}</td>
                    <td>${course.professor}</td>
                    <td>${course.courseName}</td>
                    <td>${subCourse.students}</td>
                `;
                
                row.cells[0].appendChild(courseCodeBtn);
                row.cells[1].appendChild(emailBtn);

                tableBody.appendChild(row);
            });
        });
    })
    .catch(error => {
        console.error('Error loading courses data:', error);
    });

function copyToClipboard(text, btn) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    if (btn.innerText.includes('복사 ❌')) {
        btn.innerText = '복사 ✅';
    } else {
        btn.innerText = '복사 ❌';
    }
}
