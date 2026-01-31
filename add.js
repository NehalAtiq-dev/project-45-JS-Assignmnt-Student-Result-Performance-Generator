const students = [
    { id: "S-001", name: "Kamil Raza", results: [{ sem: "Sem 1", marks: 850, max: 1000 }, { sem: "Sem 2", marks: 880, max: 1000 }, { sem: "Sem 3", marks: 920, max: 1000 }, { sem: "Sem 4", marks: 940, max: 1000 }] },
    { id: "S-002", name: "Hassan", results: [{ sem: "Sem 1", marks: 780, max: 1000 }, { sem: "Sem 2", marks: 810, max: 1000 }, { sem: "Sem 3", marks: 790, max: 1000 }, { sem: "Sem 4", marks: 830, max: 1000 }] },
    { id: "S-003", name: "Bilal", results: [{ sem: "Sem 1", marks: 710, max: 1000 }, { sem: "Sem 2", marks: 740, max: 1000 }, { sem: "Sem 3", marks: 720, max: 1000 }, { sem: "Sem 4", marks: 760, max: 1000 }] },
    { id: "S-004", name: "Zainab Ali", results: [{ sem: "Sem 1", marks: 600, max: 1000 }, { sem: "Sem 2", marks: 620, max: 1000 }, { sem: "Sem 3", marks: 650, max: 1000 }, { sem: "Sem 4", marks: 680, max: 1000 }] },
    { id: "S-005", name: "Hamza Malik", results: [{ sem: "Sem 1", marks: 420, max: 1000 }, { sem: "Sem 2", marks: 450, max: 1000 }, { sem: "Sem 3", marks: 480, max: 1000 }, { sem: "Sem 4", marks: 310, max: 1000 }] }
];

function getGrade(score, max) {
    const per = (score / max) * 100;
    if (per >= 90) return { l: "A+", c: "ap" };
    if (per >= 80) return { l: "A", c: "a" };
    if (per >= 70) return { l: "B", c: "b" };
    if (per >= 50) return { l: "C", c: "c" };
    return { l: "F", c: "f" };
}

function searchStudent() {
    const rollInput = document.getElementById('roll-input').value.trim().toUpperCase();
    const resultDiv = document.getElementById('result'); 
    const tableBody = document.getElementById('table-body');
    const studentHeader = document.getElementById('student-header');
    const summaryDiv = document.getElementById('summary');

    if (rollInput === "") {
        resultDiv.style.display = "none";
        Swal.fire({
            icon: 'warning',
            title: 'Empty Roll Number..!',
            text: 'Meharbani karke Roll Number likhein.',
            confirmButtonColor: '#3498db'
        });
        return;
    }

    const found = students.find(function(s) {
        return s.id === rollInput;
    });

    if (found) {
        resultDiv.style.display = "block";
        studentHeader.innerHTML = `<strong>Student Name:</strong> ${found.name} <br> <strong>ID:</strong> ${found.id}`;

        let grandTotalObtained = 0;
        let grandTotalMax = 0;

        const rowsHtml = found.results.map(function(res) {
            grandTotalObtained += res.marks;
            grandTotalMax += res.max;
            
            const percent = (res.marks / res.max) * 100;
            const grade = getGrade(res.marks, res.max);
            
            return `
            <tr>
                <td>${res.sem}</td>
                <td>${res.marks}</td>
                <td>${res.max}</td>
                <td>${percent.toFixed(1)}%</td>
                <td><span class="grade-box ${grade.c}">${grade.l}</span></td>
            </tr>
            `;
        }).join('');

        tableBody.innerHTML = rowsHtml;

        const finalPercentage = (grandTotalObtained / grandTotalMax) * 100;
        const isPassed = finalPercentage >= 50;
        const statusClass = isPassed ? "status-pass" : "status-fail";
        const statusText = isPassed ? "PASS" : "FAIL";

        summaryDiv.innerHTML = `
            <strong>Grand Total:</strong> ${grandTotalObtained} / ${grandTotalMax} <br>
            <strong>Overall Percentage:</strong> ${finalPercentage.toFixed(1)}% <br>
            <strong>Final Result:</strong> <span class="${statusClass}">${statusText}</span>
        `;
    } else {
        resultDiv.style.display = "none";
        Swal.fire({
            icon: 'error',
            title: 'Nahi he Shi Dalo Roll Number..!',
            text: 'Yeh Roll Number (S-001 se S-005) ke darmiyan he..',
            confirmButtonColor: '#e74c3c'
        });
    }
}