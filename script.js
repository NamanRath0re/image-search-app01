const key = "7OcOuJP-7fg4u02KUsA6_DSFaILswet8mtnyXlxnS5M"

const form = document.querySelector('form')
const input = document.getElementById('search')
// const btn = document.getElementById('search-btn')
const searchResults = document.querySelector(".search-results")
const showMore = document.querySelector('#showmore-btn')
// let inputData = ""
let page = 1;

async function searchImages(){
    // inputData=input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${input.value}&client_id=${key}`

    const response = await fetch(url);
    const data = await response.json()
    const results = data.results

    if(page===1){
        searchResults.innerHTML=""
    }

    results.map((result)=>{
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add("search-result")
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description ;
        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent =result.alt_description
        imageWrapper.append(image,imageLink)
        searchResults.appendChild(imageWrapper)
    });
    page++
    if(page>1){
        showMore.style.display="block"
    }
}

form.addEventListener("submit",(event)=>{
    event.preventDefault()
    page = 1;
    searchImages()
})
showMore.addEventListener("click",()=>{
    searchImages()
})
