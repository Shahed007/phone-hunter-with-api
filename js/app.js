const spinner = document.getElementById('loading-spinner');
const showAll = document.getElementById('showAll');
const cardContainer = document.getElementById('card-container');

// 1. connect api to website
const loadPhone = async(search='apple' ,isShowAll)=>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
  const data = await res.json();
  const phones= data.data;
  displayPhone(phones,isShowAll);
    
  
}


// 2. show data on a card
const displayPhone = (phones,isShowAll) =>{
  console.log(phones);
  // added da not found functionality
  const dataNotFound = document.getElementById('not-found');
  if(phones.length === 0){
    dataNotFound.classList.remove('hidden');
    spinner.classList.add('hidden')
  }else{
    dataNotFound.classList.add('hidden');
    
  }
  // select the parent container of an card
  const cardContainer = document.getElementById('phone-card-container');
  // clear the cardContainer for new set new data
  cardContainer.innerText = '';
  // console.log('show all', isShowAll);
  
  if(phones.length > 12 && !isShowAll){
    showAll.classList.remove('hidden')
  }else{
    showAll.classList.add('hidden')
  }

  if(!isShowAll){
    phones = phones.slice(0, 12)
  }
  // 1 show each card details
  phones.forEach(phone => {
  
    // create a div
    const cardDiv = document.createElement('div');
    // add classes
    cardDiv.classList = 'card  bg-base-100 drop-shadow-sm flex justify-center text-center p-6';
    // add element innerHTML of an div with template literals
    cardDiv.innerHTML = `
    <figure class="bg-slate-100 p-4"><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="text-center mt-6">
      <h2 class="text-center text-2xl font-bold text-gray-700 mb-5">${phone.phone_name}</h2>
      <p class="mb-2 text-lg text-gray-700">There are many variations of passages of available, but the majority have suffered</p>
      <p class="text-2xl font-bold text-gray-700 mb-4">$999</p>
      <div class="text-center ">
        <button onclick="showCardDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
      </div>
    </div>
    `;

    // add card on parent container
    cardContainer.appendChild(cardDiv);
    spinner.classList.add('hidden')
  });
}

// 3. search phone use search filed
function findMobile(isShowAll){
  // select the input filed
  const searchField = document.getElementById('search');
  const searchInput = searchField.value;
  // send input filed value load phone function
  loadPhone(searchInput,isShowAll); 
  spinner.classList.remove('hidden')
}


// attach Enter button on search filed

document.getElementById('search').addEventListener('keyup', (e) => {
  if(e.key === 'Enter'){
    // select the input filed
  const searchField = document.getElementById('search');
  const searchInput = searchField.value;
  // send input filed value load phone function
  loadPhone(searchInput);
  }
})

// add show all button
showAll.addEventListener('click', ()=>{
  findMobile(true);

})

// show card functionality
const showCardDetails = async(id) => {
  const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data;
  displayModal(phone)
  // show_modal.showModal();
}

const displayModal = (phone) => {
  console.log(phone);
  cardContainer.classList = 'flex flex-col p-4  ';
  cardContainer.innerHTML = `
      <div class="flex justify-center items-center bg-slate-200 p-7 rounded-t-lg mb-7"><img src="${phone.image}"/></div>
      <h2 class="text-gray-700 text-3xl font-bold mb-6">${phone.name}</h2>
      <p class="text-base text-gray-700 mb-5">
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
      </p>
      <div class="space-y-4">
          <p class="text-base text-gray-700 font-normal"><span class="font-bold">Storage: <span><span class="font-normal">${phone?.mainFeatures?.storage || 'no storage'}</span></p>
          <p class="text-base text-gray-700"><span class="font-bold">Display Size: <span><span class="font-normal">${phone?.mainFeatures?.displaySize || 'no display'}</span></p>
          <p class="text-base text-gray-700"><span class="font-bold">Chipset: <span><span class="font-normal">${phone?.mainFeatures?.chipSet || 'no chip set'}</span></p>
          <p class="text-base text-gray-700"><span class="font-bold">Memory: <span><span class="font-normal">${phone?.mainFeatures?.memory || 'no memory'}</span></p>
          <p class="text-base text-gray-700"><span class="font-bold">Slug: <span><span class="font-normal">${phone?.slug || 'no slug'}</span></p>
          <p class="text-base text-gray-700"><span class="font-bold">Release data: <span><span class="font-normal">${phone?.releaseDate || 'no release Date'}</span></p>
          <p class="text-base text-gray-700"><span class="font-bold">Brand: <span><span class="font-normal">${phone?.brand || 'no release brand'}</span></p>
          <p class="text-base text-gray-700"><span class="font-bold">GPS: <span><span class="font-normal">${phone?.others?.GPS || 'no GPS'}</span></p>
      </div>
  `


  show_modal.showModal();
}



loadPhone();