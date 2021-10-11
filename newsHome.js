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
    return fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=6ce4688239e846a58282d30e294094d4`)
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
        console.log(post.title);
    }

}