fetch('data.json')
    .then(response => response.json())
    .then(courses => {
        const tableBody = document.getElementById('course');
        
        courses.forEach(i => {
            let courseCodeGroup = null;

            const row = document.createElement('tr');
            
            // 강의번호
            const courseCodeBtn = document.createElement('button');
            courseCodeBtn.classList.add('copy-btn');
            courseCodeBtn.innerText = '복사 ❌';
            courseCodeBtn.addEventListener('click', function() {
                copyToClipboard(i.code, this);
            });
            
            // 찌끄레기
            row.innerHTML = `
                <td></td>
                <td>${i.code}</td>
                <td>${i.bunban}</td>
                <td?${i.lname}</td>
            `;
            row.cells[0].appendChild(courseCodeBtn);

            tableBody.appendChild(row);
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