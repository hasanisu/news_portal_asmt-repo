const loadingNav = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNav(data.data.news_category))
    .catch(error => console.log(error)) 
}

const displayNav = catagories =>{
    const catagoryArea = document.getElementById('catagory-area');
    catagories.forEach(catagory =>{
        const creatMenu = document.createElement('a');
        creatMenu.classList.add('flex-sm-fill');
        creatMenu.classList.add('text-sm-center');
        creatMenu.classList.add('nav-link');
        creatMenu.innerHTML=`
        <a onclick="loadingNews('${catagory.category_id}')" class="text-decoration-none" href="#">${catagory.category_name}</a>
        `
        catagoryArea.appendChild(creatMenu);
        
    })
    toggleSpiner(true);
    
} 

const loadingNews = category_id =>{
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayingNews(data.data))

   
}

const displayingNews = catagories =>{
    const newsExploring = document.getElementById('news-exploring')
    newsExploring.innerHTML='';
    catagories.forEach(catagory => {
        // console.log(catagory);
    const newsDiv = document.createElement('div');
    newsDiv.classList.add('col');
    newsDiv.innerHTML=`
    <div class="card style ="max-width: 200px">
              <img src="${catagory.thumbnail_url}" class="card-img-top img-thumbnail rounded" alt="...">
              <div class="card-body">
                <h5 class="card-title">${catagory.title}</h5>
                <p class="text-truncate card-text">${catagory.details}</p>
              </div">
              <div class="d-flex">
                <img style="max-height: 60px; max-width: 60px;" src="${catagory.author.img}" class="card-img-top rounded-circle" alt="...">
                <div class="ps-2 mt-2">
                <p class="m-0">${catagory.author.name}</p>
                <p>${catagory.author.published_date}</p>
                </div>
                <div class="ms-4 mt-4">
                <p><i class="fa-solid fa-eye pe-1"></i>${catagory.total_view}</p>
                </div>

                <div class="ms-4 ps-4 mt-4">
                
                <i  onclick="loadDetailsNews('${catagory._id}')"  class="fa-solid fa-arrow-right fs-3 text-primary" data-bs-toggle="modal" data-bs-target="#displayDetailsNews"></i>
                </div>
              </div>


              <div>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star-half-stroke"></i>
              <i class="fa-regular fa-star"></i>
              </div>
              
            </div>
    `
    newsExploring.appendChild(newsDiv);
    
    })

   const length = catagories.length;
if(catagories.length >= 1){
    const dataFound = document.getElementById('data-found');
    dataFound.value = length + ' ' +'News Available';
}
else{
    const dataFound = document.getElementById('data-found');
    dataFound.value = 'No News Available';
    // console.log(length, 'No News Available' )
}

    

    toggleSpiner(false); 
}







const loadDetailsNews = catagory_id =>{
    const url = `https://openapi.programming-hero.com/api/news/${catagory_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetailsNews(data.data[0]))
    .catch(error => console.log(error)) 
}

const displayDetailsNews = catagory =>{
    console.log(catagory);
    const detailsNewsExplore = document.getElementById('displayDetailsNewsLabel');
    detailsNewsExplore.innerText= catagory.title;

    const BodyText = document.getElementById('body-area');
    BodyText.innerHTML = `
    <p><span class="fw-semibold">Author Name:</span> ${catagory.author ? catagory.author.name: 'No Author Name Found'}</p>
    <p><span class="fw-semibold">Published Date:</span> ${catagory.author ? catagory.author.published_date: 'No Publish Date Found'}</p>
    <p><span class="fw-semibold">Total View:</span> ${catagory.total_view ? catagory.total_view: 'Total View Not Found'}</p>
    <p><span class="fw-semibold">Detail News:</span> ${catagory.details ? catagory.details: 'News Not Found'}</p>
    `
    
}

// spiner
const toggleSpiner = isLoading =>{
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

loadingNav()