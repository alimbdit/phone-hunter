const loadPhone = async(searchText, limit) => {
    const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    try{
        const res = await fetch(URL);
    const data = await res.json();
    displayPhones(data.data, limit);
    }
    catch(error){
        console.log(error);
    }

    
}

const displayPhones = (phones, limit) => {
    console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const noPhones = document.getElementById('no-phone');
    if(phones.length === 0){
        noPhones.classList.remove('d-none');
    }
    else{
        noPhones.classList.add('d-none');
    }
    
    const showAll = document.getElementById('show-all');

    // limit phone

    if(limit && phones.length > limit ){

        phones = phones.slice(0, limit);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }




    // display phones
    phones.forEach(phone => {
        const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
    <div class="card h-100 p-4">
    <img src="${phone.image
    }" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="showPhoneDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showPhoneDetails">Show Details</button>
    </div>
  </div>
    `;
    phoneContainer.appendChild(div);
    });

    // stop loader or spinner
    toggleSpinner(false);
};

const searchPhones = (limit) => {
    // start spinner
    toggleSpinner(true);
    const inputField = document.getElementById('phone-field').value;
    // document.getElementById('phone-field').value = '';
    loadPhone(inputField, limit);
}


// start loader or spinner on click search button

document.getElementById('search-btn').addEventListener('click', function(){
    searchPhones (9);
    
});

// search phones by enter key

document.getElementById('phone-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      
        searchPhones (9);
    }
});


const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if(isLoading){
        loader.classList.remove('d-none');
    }
    else{
        loader.classList.add('d-none');
    }
}

document.getElementById('show-all-btn').addEventListener('click', function(){
    searchPhones ();
});


const showPhoneDetails = async (id) => {
    const URL = `https://openapi.programming-hero.com/api/phone/${id}`;
    try{
        const res = await fetch(URL);
        const data = await res.json();
        showPhoneModal(data.data);
    }
    catch(error){
        console.log(error);
    }
}

const showPhoneModal = (phone) => {
    console.log(phone);
    const phoneTitle = document.getElementById('phone-name');
    phoneTitle.innerText = `${phone.name}`;

    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No release Date Found.'}</p>
        <p>Others: ${phone.others ? phone.others.WLAN : 'No others information Found.'}</p>
        <p>Memory: ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No memory information Found.'}</p>
        <p>Storage: ${phone.mainFeatures.storage ? phone.mainFeatures.storage : 'No storage information Found.'}</p>
    `;
}

loadPhone('apple')