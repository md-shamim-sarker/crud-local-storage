if(!localStorage.persons) {
    const persons = [];
    localStorage.setItem('persons', JSON.stringify(persons));
}

const getPersons = localStorage.getItem('persons');
const personsArray = JSON.parse(getPersons);

document.getElementById('btn-submit').addEventListener('click', () => {
    const slValue = personsArray.length + 1;
    const nameValue = document.getElementById('name-field').value;
    const ageValue = Number(document.getElementById('age-field').value);
    personsArray.push({sl: slValue, name: nameValue, age: ageValue});
    localStorage.setItem('persons', JSON.stringify(personsArray));
    display();
    document.getElementById('name-field').value = '';
    document.getElementById('age-field').value = '';
});

const display = () => {
    const tbody = document.getElementById('tbody');
    document.getElementById('tbody').innerHTML = "";
    personsArray.forEach(element => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${personsArray.indexOf(element) + 1}</td>
            <td>${element.name}</td>
            <td>${element.age}</td>
            <td><button onclick="updateItem(this.value)" value="${element.name}">Update</button></td>
            <td><button onclick="removeItem(this.value)" value="${element.name}">Delete</button></td>
        `;
        tbody.appendChild(tr);
    });
};
display();

document.getElementById('btn-clear').addEventListener('click', () => {
    const confirmation = confirm('Are you sure? You are going to delete all data.');
    if(confirmation) {
        localStorage.clear();
        location.reload();
    }
});

const updateItem = event => {
    const element = personsArray.find(obj => obj.name === event);
    const indexNo = personsArray.indexOf(element);
    document.getElementById('name-field').value = personsArray[indexNo].name;
    document.getElementById('age-field').value = personsArray[indexNo].age;
    personsArray.splice(indexNo, 1);
};

const removeItem = event => {
    const element = personsArray.find(obj => obj.name === event);
    const indexNo = personsArray.indexOf(element);
    personsArray.splice(indexNo, 1);
    localStorage.setItem('persons', JSON.stringify(personsArray));
    display();
};