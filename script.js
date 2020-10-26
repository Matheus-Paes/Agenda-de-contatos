const addBtn = document.querySelector('#btnSave');
const listElement = document.getElementById('list');
const appForm = document.getElementById('app-form');
const closeModal = document.querySelector('#closeModal');

var contactList = [];


appForm.onsubmit = addContact;

// closeModal.onclick = () => {
//   document.getElementById('modal').style.top = '-100%';
// }

// const modalTemplate = (person) => {
//   return `
//   <div id="modal" class="modal">
//   <span id="closeModal" class="closeModal">&times;</span>

//   <div class="modal-card">

//     <div class="modal-content">

//       <div class="modal-avatar">
//         <span class="user-avatar">
//           <i class="fas fa-user-circle"></i>
//         </span>
//       </div><!--modal-avatar-->

//       <div class="modal-info">
//         <p>Name: ${person.name}</p>
//         <p>Phone: ${person.phone}</p>
//         <p>E-mail: ${person.email}</p>
//       </div>

//       <div class="modal-btn-wrapper">
//         <a class="modal-btn" href="#">Delete</a>
//         <a class="modal-btn" href="#">Edit</a>
//       </div>
//     </div>
//   </div>
// </div>
//   `
//}

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

  sortList();

}



function formValidation(person) {
  const emailRegex = /\S+@\S+\.\S+/;

  var validation = {
    status: true,
    error: ''
  }

  if(person.name.length === 0) {
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
    const nameEl = document.createElement('h2');
    nameEl.appendChild(document.createTextNode(`${person.name}`));

    const phoneEl = document.createElement('p');
    phoneEl.appendChild(document.createTextNode(`Phone: ${person.phone}`));

    const emailEl = document.createElement('p');
    emailEl.appendChild(document.createTextNode(`E-mail: ${person.email}`));
    //Criar os elementos da lista

    const index = contactList.indexOf(person); //variavel que armazena o indice de cada item do array para passa para a função removeContact

    //criando botão remove
    const removeEl = document.createElement('a');
    removeEl.setAttribute('href', '#');
    const removeElTxt = document.createTextNode('Remove');
    removeEl.appendChild(removeElTxt);
    removeEl.setAttribute('onclick', `removeContact(${index})`);
    //criando botão remove



    //criando botão view
    // const viewBtn = document.createElement('a');
    // viewBtn.setAttribute('href', '#');
    // viewBtn.setAttribute('id', 'viewBtn');
    // const viewBtnTxt = document.createTextNode('View');
    // viewBtn.appendChild(viewBtnTxt);
    // viewBtn.setAttribute('onclick', `viewContact()`);
    //criando botão view



    //criando o botão edit
    var editEl = document.createElement('a');
    editEl.setAttribute('href', '#');
    var editElTxt = document.createTextNode('Edit');
    editEl.appendChild(editElTxt);
    editEl.setAttribute('onclick', `editContact(${index})`);
    //criando o botão edit


    //Criação da lista li
    const itemEl = document.createElement('li');
    itemEl.appendChild(nameEl);
    itemEl.appendChild(phoneEl);
    itemEl.appendChild(emailEl);
    itemEl.appendChild(editEl);
    itemEl.appendChild(removeEl);
    // itemEl.appendChild(viewBtn);

    listElement.appendChild(itemEl);
    //Criação da lista li
  }

}



// function viewContact() {
//   const modal = document.querySelector('#modal');
//   modal.style.top = '0';
// }


function removeContact(index) {
  contactList.splice(index, 1);
  renderList();
}

function editContact(index) {
  const btnSave = document.querySelector('#btnSave');
  const btnEdit = document.querySelector('#btnEdit');
  const input_name = document.querySelector('#inputName');
  const input_phone = document.querySelector('#inputPhone');
  const input_email = document.querySelector('#inputEmail');

  btnSave.setAttribute('style', 'display: none');
  btnEdit.setAttribute('style', 'display: block');

  input_name.value = contactList[index].name;
  input_phone.value = contactList[index].phone;
  input_email.value = contactList[index].email;

  btnEdit.onclick = (e) => {
    e.preventDefault();

    const editedContact = {
      name: input_name.value,
      phone: input_phone.value,
      email: input_email.value,
    };

    const validation = formValidation(editedContact);
    if(!validation.status) {
      alert(validation.error);
      return;
    }
    console.log(editedContact.name.length);
  
    input_name.value = '';
    input_phone.value = '';
    input_email.value = '';
  
    btnSave.setAttribute('style', 'display: block');
    btnEdit.setAttribute('style', 'display: none');

    contactList[index] = editedContact;
    renderList();
  }

}

function sortList() {
  contactList.sort((a, b) => {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    if(x < y) return -1;
    if(x > y) return 1;
    return 0;
  });
  console.log(contactList);
  renderList();
}