let currentPage = 1;
let limit = 5;


const divHead = document.getElementById("nav-head");
const entertainmentHead = document.getElementById("nav-entertainment");
const sportsHead = document.getElementById("nav-sports");
const techHead = document.getElementById("nav-tech");

divHead.addEventListener("click", function(){
    window.location.href = "newsHome.html";
});

entertainmentHead.addEventListener("click", function(){
    window.location.href = "entertainment.html";
});

sportsHead.addEventListener("click", function(){
    window.location.href = "sports.html";
});

techHead.addEventListener("click", function(){
    window.location.href = "technology.html";
});


const searchBtn = document.getElementById("submit");
searchBtn.addEventListener("click", function(e){
    e.preventDefault();
    
    createPagination();  // CREATING PAGINATION ON CLICKING SEARCH
    
    const bodyContainer = document.getElementById("body-container");
    bodyContainer.innerHTML = null;
    
    const query = document.querySelector("input").value;
    
    handleQuery(query, currentPage, limit);
})

const pagination = document.getElementById("pagination");
pagination.addEventListener("click", handlePageChange);

function createPagination(){

    console.log(currentPage)
    const pageDiv = document.getElementById("pagination");
    pageDiv.innerHTML = null;
    // Page prev, current, next
    
    const prev = document.createElement("button");
    prev.textContent = currentPage - 1;
    prev.name = currentPage - 1;
    
    if (currentPage === 1){
        prev.textContent = "Previous";
        prev.disabled = true;
    }
    
    const current = document.createElement("button");
    current.textContent = currentPage;
    current.name = currentPage;
    
    const next = document.createElement("button");
    next.textContent = currentPage + 1;
    next.name = currentPage + 1;
    
    pageDiv.append(prev, current, next);
}

window.addEventListener("load", handleLoad);

async function handlePageChange(e){
    try{
        const pageNumber = parseInt(e.target.name);
        currentPage = pageNumber;
        console.log("HANDLE", currentPage)
        createPagination(currentPage);

        query = document.querySelector("input").value;
        handleQuery(query, currentPage, limit);

    }
    catch{

    }

}
async function handleLoad(){
    try {
        let response = await fetchPost();
        
        createPost(response);
        
    }
    catch {
        
    }
}

function fetchPost(){
    return fetch(`https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=8abeb07e9a094ab7a25ba0162f8cbf40`)
    .then(function (response) {
        return response.json();
    })
    .catch(function (err) {
        
    })
}

function createPost(response){
    const container = document.getElementById("body-container");
    container.innerHTML = "";
    
    const data = response.articles;

    if (data.length == 0){
        const errorMsg = document.createElement("h2");
        errorMsg.textContent = `No results found.`;
        errorMsg.setAttribute('id', 'error');

        container.append(errorMsg);
    }
    else{
        const newsDiv = document.createElement("div");
        newsDiv.setAttribute("id", "news-container");
        
        if (data.length > 10){
            for (let i = 0; i < 10; i++){
                let post = data[i];
                const newsCard = createNewsCard(post);
                newsDiv.append(newsCard);
            }
        }
        else{
            for (let i = 0; i < data.length; i++){
                let post = data[i];
                const newsCard = createNewsCard(post);
                newsDiv.append(newsCard);
            }
        }
    
        container.append(newsDiv)

    }

}

function createNewsCard(post){

    const articleDiv = document.createElement("div");
    articleDiv.setAttribute("class", "article-div");

    const infoDiv = document.createElement("div");
    infoDiv.setAttribute("class", "info-div");

    const title = post.title;
    const summary = post.description;
    const source = post.source.name;
    const newsImage = post.urlToImage;
    const learnMore = post.url;

    const heading = document.createElement("h2");
    heading.textContent = title;
    heading.setAttribute("class", "news-head");

    const story = document.createElement("p");
    story.textContent = summary;
    story.setAttribute("class", "news-body");

    const sourceInfo = document.createElement("p");
    sourceInfo.textContent = `Source: ${source}`;
    sourceInfo.setAttribute("class", "news-body");

    const learn = document.createElement("p");
    learn.innerHTML = `<a href="${learnMore}">View Full Coverage</a>`;
    learn.setAttribute("class", "news-body");

    const imageDiv = document.createElement("div");
    imageDiv.setAttribute("class", "image-div")
    imageDiv.innerHTML = `<img class="img" src="${newsImage}"/>`;

    infoDiv.append(heading, story, sourceInfo, learn);
    articleDiv.append(imageDiv, infoDiv);

    return articleDiv;

}

function fetchQueryPost(query, page, limit){
    
    page = page || 1;
    limit = limit || 5;

    return fetch(`https://newsapi.org/v2/top-headlines?q=${query}&page=${page}&pageSize=${limit}&apiKey=8abeb07e9a094ab7a25ba0162f8cbf40`)
    .then(function(response){
        return response.json();
    })
    .catch(function(err){

    })
}

async function handleQuery(query, page, limit){
    try{
        let queryResponse = await fetchQueryPost(query, page, limit);
        
        const searchHead = document.getElementById("headline-head");
        searchHead.textContent = `Showing results for "${query}"`;

        createPost(queryResponse);

    }
    catch{
        
    }
}