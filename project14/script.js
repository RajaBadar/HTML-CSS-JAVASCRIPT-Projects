// get DOM elements
const form = document.getElementById('form');
const search = document.getElementById('search');
const results = document.getElementById('results');
const pagination = document.getElementById('pagination');

//base url for api fetch
const api = "https://api.lyrics.ovh";

//functions
//1.function to search song title and artist
async function searchSongs(term){
    const res = await fetch(`${api}/suggest/${term}`);
    const data = await res.json();
    showData(data);
    console.log(data);
};

//2.function to display data from search in the DOM
function showData(data){
    //display the first set of song in the DOM
    results.innerHTML = `
        <ul class="songs">
            ${data.data.map( 
                  song => `
                            <li>
                                <span>${song.artist.name} - ${song.title}</span>
                                <button class="btn" data-artist ="${song.artist.name}" data-title ="${song.title}">Get Lyrics</button>
                            </li>
                        `
                ).join('')
            } 
        </ul>
    `;
    //add pagination if require
    if (data.prev || data.next){
        pagination.innerHTML = ` 
            ${data.prev ? `<button class="btn" onClick="getMoreSongs('${data.prev}')">Previous</button>`:''}
            ${data.next ? `<button class="btn" onClick="getMoreSongs('${data.next}')">NEXT</button>`:''}
        `;
    }else{
        pagination.innerHTML = '';
    }
};
//3.function to get prev ot next songa
async function getMoreSongs(url){
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
    const data = await res.json();
    showData(data);
    
};
//4.function to get lyrics
async function getLyrics(artist,title){
    const res = await fetch(`${api}/v1/${artist}/${title}`);
    const data = await res.json();
  
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '</br>');
    
    results.innerHTML = `
        <h2>${artist} - ${title}</h2>
        <p>${lyrics}</p>
    `;
    pagination.innerHTML = '';
    
};

//Evenet listeners
//1.event listener for search form
form.addEventListener('submit', e =>{
    //prevent the reload of page on submit
    e.preventDefault();
    //get the search term from the input field
    const searchTerm = search.value.trim();
    //check if search term is valid
    if (searchTerm){
        searchSongs(searchTerm);

    }else{
        alert('Please enter a valid search');
    }
});
//2.event listener to get to a song lyrics
results.addEventListener('click', e =>{
   //find out what was clicked
    const clickedElement = e.target;
    //check if clicked element is button
   if( clickedElement.tagName === 'BUTTON' ){
       //get artist and title from HTML5 custom propeties on button
       const artist = clickedElement.getAttribute('data-artist');
       const title = clickedElement.getAttribute('data-title');
       //now fetch the lyrics
       getLyrics(artist,title);
       

   }

});
