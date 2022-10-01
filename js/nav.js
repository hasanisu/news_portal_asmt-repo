const loadingNav = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNav(data.data.news_category))
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
} 

const loadingNews = category_id=>{
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
    <div class="card">
              <img style="max-height: 500px;" src="${catagory.thumbnail_url}" class="card-img-top" alt="...">
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

    
}

const loadDetailsNews = catagory_id =>{
    const url = `https://openapi.programming-hero.com/api/news/${catagory_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayDetailsNews(data.data[0]))
}

const displayDetailsNews = catagory =>{
    console.log(catagory);
    const detailsNewsExplore = document.getElementById('displayDetailsNewsLabel');
    detailsNewsExplore.innerText= catagory.title;

    const BodyText = document.getElementById('body-area');
    BodyText.innerHTML = `
    <p>Author Name: ${catagory.author ? catagory.author.name: 'No Author Name Found'}</p>
    <p>Published Date: ${catagory.author ? catagory.author.published_date: 'No Publish Date Found'}</p>
    <p>Total View: ${catagory.total_view ? catagory.total_view: 'Total View Not Found'}</p>
    <p>Full News: ${catagory.details ? catagory.details: 'News Not Found'}</p>
    `

}

loadingNav()