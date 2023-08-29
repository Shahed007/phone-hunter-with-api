const spinner = document.getElementById('loading-spinner');
const showAll = document.getElementById('showAll');

// 1. connect api to website
const loadPhone = async(search='apple' ,isShowAll)=>{
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`);
  const data = await res.json();
  const phones= data.data;
  displayPhone(phones,isShowAll);
    
  
}


// 2. show data on a card
const displayPhone = (phones,isShowAll) =>{
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
        <button class="btn btn-primary">Buy Now</button>
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


loadPhone();