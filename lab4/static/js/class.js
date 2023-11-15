class User {
    get age() {
        return this._age;
    }

    set age(value) {
        this._age = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    constructor(name, age) {
        this._name = name;
        this._age = age;
    }

    getFullInfo() {
        return `${this._name}, ${this._age}`;
    }
}

class Worker extends User {
    constructor(name, age, experience, salary, gender) {
        super(name, age);
        this._experience = experience;
        this._gender = gender;
        this._salary = salary;
    }

    get salary() {
        return this._salary;
    }

    set salary(value) {
        this._salary = value;
    }

    get experience() {
        return this._experience;
    }

    set experience(value) {
        this._experience = value;
    }

    get gender() {
        return this._gender;
    }

    set gender(value) {
        this._gender = value;
    }

    getFullInfo() {
        return `${super.getFullInfo()}, ${this._experience}, ${this._salary}, ${this._gender}`;
    }
}

function decorator(func) {
    return function () {
        let result = this.experience > 10 ? "Old worker " : "New worker ";
        result += func.call(this);
        return result
    };
}

worker = new Worker("misha", 20, 15, 3500, "male");

/*console.log(worker.getFullInfo());
worker.getFullInfo = decorator(worker.getFullInfo);
console.log(worker.getFullInfo());*/

document.addEventListener('DOMContentLoaded', function () {
    const getAgeButton = document.getElementById('getClassAgeButton');
    const getNameButton = document.getElementById('getClassNameButton');
    const getFullInfoButton = document.getElementById('getClassFullInfoButton');
    const getFullDecoratedInfoButton = document.getElementById('getClassFullDecoratedInfoButton');
    const getExperienceButton = document.getElementById('getClassExperienceButton');
    const getSalaryButton = document.getElementById('getClassSalaryButton');

    // Обработчики событий
    getNameButton.addEventListener('click', function () {
        alert(`Name: ${worker.name}`);
    });

    getAgeButton.addEventListener('click', function () {
        alert(`Age: ${worker.age}`);
    });

    getExperienceButton.addEventListener('click', function () {
        alert(`Experience: ${worker.experience}`);
    });

    getSalaryButton.addEventListener('click', function () {
        alert(`Salary: ${worker.salary}`);
    });

    getFullInfoButton.addEventListener('click', function () {
        alert(`Full info: ${worker.getFullInfo()}`);
    });

    getFullDecoratedInfoButton.addEventListener('click', function () {
        worker.dec = decorator(worker.getFullInfo);
        alert(`Decorated full info: ${worker.dec()}`);
    });
});