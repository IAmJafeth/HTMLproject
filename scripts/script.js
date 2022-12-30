const baseURL = "https://api.rawg.io/api/games"
const apiKey = "?key=4f8b072c535b43c2ab489aaa60e0a0ca&"

function callRAWGapi (request,action){
    fetch (baseURL+apiKey+request)
    .then(res => res.json())
    .then(data => action(data))
}

function getTopMetacriticGames(){
    let apiRequest = "metacritic=90,100&page_size=25&ordering=-rating&exclude_additions=true";
    callRAWGapi(apiRequest,showMetacriticTop20)
}
    
function showMetacriticTop20(data){
    console.log(data.results);
    let parentSection = document.getElementById("20MetaGames")

    for(let i = 0; i < 20; i++){
        console.log(data.results[i].id)
        
        let cardElement = document.createElement("article");
        cardElement.classList.add("card");
        parentSection.appendChild(cardElement);

        let htmlContent = `<img src=`+data.results[i].background_image+` alt="`+ data.results[i].name +` Cover">
        <h2>`+ data.results[i].name +`</h2>
        <h3>Metacritic: </h3> <p>`+ data.results[i].metacritic +`/100</p>
        <br>
        <h3>Release Date: </h3> <p>`+data.results[i].released+`</p>`;
        
        cardElement.insertAdjacentHTML('beforeend',htmlContent);
    }

}

function showDefaultGameTrailers(data){
    console.log(data.results);

    for(let i = 0; i < 10; i++){
        fetch(baseURL+"/"+data.results[i].id+"/reddit")
        .then(res => res.json())
        .then(data =>{

            

        })
    }


}

getTopMetacriticGames()

