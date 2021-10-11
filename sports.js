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

window.addEventListener("load", handleLoad);

async function handleLoad(){
    try {
        let response = await fetchPost();
        
        createPost(response);
        
    }
    catch {
        
    }
}

function fetchPost(){
    return fetch(`https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=6ce4688239e846a58282d30e294094d4`)
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

    const newsDiv = document.createElement("div");
    newsDiv.setAttribute("id", "news-container");

    for (let i = 0; i < 10; i++){
        let post = data[i];
        const newsCard = createNewsCard(post);
        newsDiv.append(newsCard);
    }

    container.append(newsDiv)

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