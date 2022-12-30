const baseURL = "https://api.rawg.io/api/games"
const apiKey = "?key=4f8b072c535b43c2ab489aaa60e0a0ca&"

function callRAWGapi (request,action){
    console.log("Entered callRAWGapi")
    fetch (baseURL+apiKey+request)
    .then(res => res.json())
    .then(data => action(data))
}

function getTopMetacriticGames(){
    const apiRequest = "metacritic=90,100&page_size=30&ordering=-metacritic&exclude_additions=true";
    callRAWGapi(apiRequest,showGameCards);
}

function getDefaultGameForums(){
    console.log("Entered getDefaultGameForums")
    callRAWGapi("",showGameForums);
}
    
function showGameCards(data){
    console.log(data.results);
    const parentSection = document.getElementById("20MetaGames")

    for(let i = 0; i < 30; i++){
        if (data.results[i].metacritic == null){
            data.results[i].metacritic = "Not Available";
        };
        
        const cardElement = document.createElement("article");
        cardElement.classList.add("card");
        parentSection.appendChild(cardElement);

        const htmlContent = `<img src=`+data.results[i].background_image+` alt="img/GamePlaceHolder.png" onerror="this.onerror=null;this.src=this.alt;" ">
        <h2>`+ data.results[i].name +`</h2>
        <h3>Metacritic: </h3> <p>`+ data.results[i].metacritic +`/100</p>
        <br>
        <h3>Rating: </h3> <p>`+ data.results[i].rating +`/5</p>
        <br>
        <h3>Release Date: </h3> <p>`+data.results[i].released+`</p>`;
        
        cardElement.insertAdjacentHTML('beforeend',htmlContent);
    }

}

function showGameForums(data){
    console.log("Entered showGameForums")
    console.log(data.results);

    for(let i = 0; i < 15; i++){
        fetch(baseURL+"/"+data.results[i].id+"/reddit"+apiKey)
        .then(res => res.json())
        .then(dataForum => get3Forums(dataForum,data.results[i].name))
    }

}

function get3Forums(data,gameName){
    console.log("Entered get3Forums")
    console.log(data)

    const parentDiv = document.getElementById("defaultGameForums");
    const gameTitle = document.createElement("h2");
    const cardSection = document.createElement('section');
    gameTitle.insertAdjacentText('beforeend',gameName);
    parentDiv.appendChild(gameTitle);

    if(data.count > 0){
        cardSection.classList.add('container');
        cardSection.setAttribute('id','3GameForums');

        for(let i = 0; i < 3; i++){
            const htmlContent = `<article class="cardForum">
            <img src=` + data.results[i].image + ` alt="img/RedditLogo.jpeg" onerror="this.onerror=null;this.src=this.alt;" ">
            <h3>`+ data.results[i].name +`</h3> 
            <p>`+ data.results[i].text +`</p>
            <br>
            <a href=` + data.results[i].url + ` target="_blank">Go to Reddit</a>
        </article>`

        cardSection.insertAdjacentHTML('beforeend',htmlContent);
        }
        
        
        parentDiv.appendChild(cardSection);
    }
    else {
        const error = document.createElement("h4");
        error.innerText = "No Forums Found"
        parentDiv.appendChild(error);
    }
}

function submitGameSearch(){
    const searchTitle = document.getElementById("searchGamesTitle");
    searchTitle.innerText = "Results";
    const searchBar = document.getElementById("gamesearch");
    userInput = searchBar.value;
    searchGames(userInput);
}

function searchGames(name){
    const parentSection = document.getElementById("20MetaGames");
    parentSection.innerHTML = "";
    const apiRequest = "page_size=30&exclude_additions=true&exclude_parents=true&search="+name+"&search_exact=true";
    callRAWGapi(apiRequest,showGameCards);
}

function submitForumSearch(){
    const searchBar = document.getElementById("forumsearch");
    userInput = searchBar.value;
    searchForums(userInput);
}

function searchForums(name){
    const defaultGames = document.getElementById("defaultGameForums");
    defaultGames.innerHTML="";
    const apiRequest = "page_size=15&exclude_additions=true&exclude_parents=true&search="+name+"&search_exact=true&ordering=-rating";
    callRAWGapi(apiRequest,showGameForums)
}

function getBestGames(){
    const apiRequest = "page_size=30&exclude_additions=true&exclude_parents=true&ordering=-rating";
    callRAWGapi(apiRequest,showBestGames);
}

function showBestGames(data){
    console.log(data.results);
    const parentSection = document.getElementById("bestGames")

    for(let i = 0; i < 30; i++){
        if (data.results[i].metacritic == null){
            data.results[i].metacritic = "Not Available";
        };
        
        const cardElement = document.createElement("article");
        cardElement.classList.add("card");
        parentSection.appendChild(cardElement);

        const htmlContent = `<img src=`+data.results[i].background_image+` alt="img/GamePlaceHolder.png" onerror="this.onerror=null;this.src=this.alt;" ">
        <h2>`+ data.results[i].name +`</h2>
        <h3>Metacritic: </h3> <p>`+ data.results[i].metacritic +`/100</p>
        <br>
        <h3>Rating: </h3> <p>`+ data.results[i].rating +`/5</p>
        <br>
        <h3>Release Date: </h3> <p>`+data.results[i].released+`</p>`;
        
        cardElement.insertAdjacentHTML('beforeend',htmlContent);
    }

}

