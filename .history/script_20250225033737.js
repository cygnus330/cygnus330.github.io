// JSON 파일을 로드하고 테이블에 추가하는 함수
fetch('data.json')
    .then(response => response.json())
    .then(courses => {
        const tableBody = document.getElementById('course-table');
        
        // 강의 데이터 반복
        courses.forEach(course => {
            // 서브 강의 반복
            course.subCourses.forEach(subCourse => {
                const row = document.createElement('tr');
                
                // 강의번호 복사 버튼
                const courseCodeBtn = document.createElement('button');
                courseCodeBtn.classList.add('copy-btn');
                courseCodeBtn.innerText = '복사 ❌';
                courseCodeBtn.addEventListener('click', function() {
                    copyToClipboard(course.courseCode, this);
                });

                // 애드메일 복사 버튼
                const emailBtn = document.createElement('button');
                emailBtn.classList.add('copy-btn');
                emailBtn.innerText = '복사 ❌';
                emailBtn.addEventListener('click', function() {
                    copyToClipboard(subCourse.email, this);
                });
                
                // 행 내용 추가
                row.innerHTML = `
                    <td></td>
                    <td></td>
                    <td>${course.courseCode}</td>
                    <td>${subCourse.section}</td>
                    <td>${course.professor}</td>
                    <td>${course.courseName}</td>
                    <td>${subCourse.students}</td>
                `;
                
                // 버튼을 각 셀에 넣기
                row.cells[0].appendChild(courseCodeBtn);
                row.cells[1].appendChild(emailBtn);

                // 테이블에 추가
                tableBody.appendChild(row);
            });
        });
    })
    .catch(error => {
        console.error('Error loading courses data:', error);
    });

// 클립보드 복사 함수
function copyToClipboard(text, btn) {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    
    // 복사 버튼 상태 변경
    if (btn.innerText.includes('복사 ❌')) {
        btn.innerText = '복사 ✅';
    } else {
        btn.innerText = '복사 ❌';
    }
}
