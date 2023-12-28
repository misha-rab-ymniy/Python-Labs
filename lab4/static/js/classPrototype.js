function UserProto(name, age) {
    this.name = name;
    this.age = age;
}

UserProto.prototype.getAge = function () {
    return this.age;
}

UserProto.prototype.setAge = function (value) {
    this.age = value;
}

UserProto.prototype.getName = function () {
    return this.name;
}

UserProto.prototype.setName = function (value) {
    this.name = value;
}

UserProto.prototype.getFullInfo = function () {
    return `${this.name}, ${this.age}`;
}


function WorkerProto(name, age, experience, salary, gender) {
    UserProto.call(this, name, age);
    this.experience = experience;
    this.gender = gender;
    this.salary = salary;
}

WorkerProto.prototype.getSalary = function () {
    return this.salary;
}

WorkerProto.prototype.setSalary = function (value) {
    this.salary = value;
}

WorkerProto.prototype.getExperience = function () {
    return this.experience;
}

WorkerProto.prototype.setExperience = function (value) {
    this.experience = value;
}

WorkerProto.prototype.getGender = function () {
    return this.gender;
}

WorkerProto.prototype.setGender = function (value) {
    this.gender = value;
}

WorkerProto.prototype.getFullInfo = function () {
    return `${UserProto.prototype.getFullInfo.call(this)}, ${this.experience}, ${this.salary}, ${this.gender}`;
}


function decorator_proto(func) {
    return function () {
        let result = this.experience > 10 ? "Old worker " : "New worker ";
        result += func.call(this);
        return result
    };
}

worker_proto = new WorkerProto("vasya", 20, 8, 3500, "male");

/*console.log(worker.getFullInfo());
worker.getFullInfo = decorator(worker.getFullInfo);
console.log(worker.getFullInfo());*/

document.addEventListener('DOMContentLoaded', function () {
    const getProtoAgeButton = document.getElementById('getClassProtoAgeButton');
    const getProtoNameButton = document.getElementById('getClassProtoNameButton');
    const getProtoFullInfoButton = document.getElementById('getClassProtoFullInfoButton');
    const getProtoFullDecoratedInfoButton = document.getElementById('getClassProtoFullDecoratedInfoButton');
    const getProtoExperienceButton = document.getElementById('getClassProtoExperienceButton');
    const getProtoSalaryButton = document.getElementById('getClassProtoSalaryButton');
    // Обработчики событий
    getProtoNameButton.addEventListener('click', function () {
        alert(`Name: ${worker_proto.name}`);
    });

    getProtoAgeButton.addEventListener('click', function () {
        alert(`Age: ${worker_proto.age}`);
    });

    getProtoExperienceButton.addEventListener('click', function () {
        alert(`Experience: ${worker_proto.experience}`);
    });

    getProtoSalaryButton.addEventListener('click', function () {
        alert(`Salary: ${worker_proto.salary}`);
    });

    getProtoFullInfoButton.addEventListener('click', function () {
        alert(`Full info: ${worker_proto.getFullInfo()}`);
    });

    getProtoFullDecoratedInfoButton.addEventListener('click', function () {
        worker_proto.dec = decorator(worker_proto.getFullInfo);
        alert(`Decorated full info: ${worker_proto.dec()}`);
    });
});