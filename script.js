const addBtn = document.querySelector('.btn');
const listElement = document.getElementById('list');
const appForm = document.getElementById('app-form');


var contactList = [];

appForm.onsubmit = addContact;

function addContact (e) {
  e.preventDefault();
  
  const name = e.target.inputName.value;
  const phone = e.target.inputPhone.value;
  const email = e.target.inputEmail.value;

  const person = { name, phone, email }

  var validation = formValidation(person);
  if(!validation.status) {
    alert(validation.error);
    return;
  }

  contactList.push(person);
  appForm.reset();
  renderList();
  console.log(contactList);
  console.log(person);


}

function formValidation(person) {
  const emailRegex = /\S+@\S+\.\S+/;

  var validation = {
    status: true,
    error: ''
  }

  if(person.name.length == 0) {
    validation.status = false;
    validation.error = 'Insira um nome';
  }
  else if(person.phone.length < 10) {
    validation.status = false;
    validation.error = 'Informe um telefone valido';
  }
  else if(person.email.length == 0) {
    validation.status = false;
    validation.error = 'Informe um e-mail';
  }

  else if(emailRegex.test(person.email) == false) {
    validation.status = false;
    validation.error = 'Informe um e-mail valido';
  }

  return validation;
}

function renderList() {
  listElement.innerHTML = '';

  for(person of contactList) {
    //Criar os elementos da lista
    var nameEl = document.createElement('h2');
    nameEl.appendChild(document.createTextNode(`Name: ${person.name}`));

    var phoneEl = document.createElement('p');
    phoneEl.appendChild(document.createTextNode(`Phone: ${person.phone}`));

    var emailEl = document.createElement('p');
    emailEl.appendChild(document.createTextNode(`E-mail: ${person.email}`));
    //Criar os elementos da lista

    var index = contactList.indexOf(person); //variavel que armazena o indice de cada item do array para passa para a função removeContact

    //criando botão remove
    var removeEl = document.createElement('a');
    removeEl.setAttribute('href', '#');
    var removeElTxt = document.createTextNode('Remove');
    removeEl.appendChild(removeElTxt);
    removeEl.setAttribute('onclick', `removeContact(${index})`);
    //criando botão remove

    //criando o botão edit
    var editEl = document.createElement('a');
    editEl.setAttribute('href', '#');
    var editElTxt = document.createTextNode('Edit');
    editEl.appendChild(editElTxt);
    editEl.setAttribute('onclicl', `editContact(${index})`);
    //criando o botão edit


    //Criação da lista li
    var itemEl = document.createElement('li');
    itemEl.appendChild(nameEl);
    itemEl.appendChild(phoneEl);
    itemEl.appendChild(emailEl);
    itemEl.appendChild(editEl);
    itemEl.appendChild(removeEl);

    listElement.appendChild(itemEl);
    //Criação da lista li
  }
}

function removeContact(index) {
  contactList.splice(index, 1);
  renderList();

}

function editContact() {

}