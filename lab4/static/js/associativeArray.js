function getValueAndClear(inputElement) {
    const value = inputElement.value;
    inputElement.value = '';
    return value;
}

function isStudentWithGoodGrades(student) {
    return student.physics >= 4 && student.math >= 4 && student.literature >= 4;
}


const studentList = document.getElementById('student-list');

const firstnameInput = document.getElementById('firstname');

const lastnameInput = document.getElementById('lastname');

const physicsInput = document.getElementById('physics');

const mathInput = document.getElementById('math');

const literatureInput = document.getElementById('literature');


const studentMap = new Map();

const associativeForm = document.forms.namedItem('associative-form');
associativeForm.onsubmit = (e) => {
    e.preventDefault();

    const firstname = getValueAndClear(firstnameInput);
    const lastname = getValueAndClear(lastnameInput);
    const physics = Number(getValueAndClear(physicsInput));
    const math = Number(getValueAndClear(mathInput));
    const literature = Number(getValueAndClear(literatureInput));

    const studentListItem = document.createElement('li');
    studentListItem.textContent = `${firstname} ${lastname} physics: ${physics}, math: ${math}, literature: ${literature} cm`;
    studentList.appendChild(studentListItem);

    const newStudent = {firstname, lastname, physics, math, literature, studentListItem};

    let status = isStudentWithGoodGrades(newStudent) ? "good" : "bad"

    if (studentMap.has(status)) {
        const student = studentMap.get(status);
        student.push(newStudent);
    } else {
        studentMap.set(status, [newStudent]);
    }

    if (status === "good") {
        newStudent.studentListItem.style.backgroundColor = "green";
    }
};