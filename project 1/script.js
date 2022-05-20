//GEt dom elements
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectmovie = document.getElementById('movie');

// get the ticket price from the selectmovie dropdown
let ticketprice = +selectmovie.value;

// call the updateui function to get data drom localstoraeg and update ui

updateUI();




// function to update counts
// Function to update counts
function updateCount() {
    // how many seats are selected
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    // create an array using the nodelist
    const seatIndex = [...selectedSeats].map( seat => [...seats].indexOf(seat) );
        
     
    console.log('array', seatIndex);
    // get the numbers of seats from nodelist
    const selectedSeatsCount = selectedSeats.length;
    //update dom with count
    count.innerText = selectedSeatsCount;
    // update dom with total price
    total.innerText = selectedSeatsCount * ticketprice;
    // save data to local starage
    localStorage.setItem('selectedSeats',JSON.stringify(seatIndex));
};
 
//fucntion to save movie data
function savemoviedata(movieIndex , movieprice) {
    localStorage.setItem('movieIndex' , movieIndex);
    localStorage.setItem('movieprice' , movieprice);
}

// function to get datafrom localstorage and to update UI
function updateUI() {
    const selectedSeats = JSON.parse (localStorage.getItem('selectedSeats'));
    // get the selected seats data from local storage check if SELECTED SEATS 
    if (selectedSeats !== null && selectedSeats.length > 0 ) {
        // loop all over seats
        seats.forEach((seat, index ) => {
            // if the index of seat is contaiend inside selected seats array
            if (selectedSeats.indexOf(index) > -1 ) {
                //add the selected class to the seat
                seat.classList.add('selected');
            }

        })

    }
    // get the selected movie from local storage 
    const movieIndex = localStorage.getItem('movieIndex');
    //  check if there is movie index
    if ( movieIndex !== null) {
        // use the movieindex from local storage to update movie from dropdown
        selectmovie.selectedIndex = movieIndex;
    }
    
    // update the  conts
    updateCount();
};

 // event listener
 // listen for list on container

 container.addEventListener('click',e =>  { 
     // check if target has a class of seat and also is not occupied
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')  ) {
        // add or remove selected class on click
        e.target.classList.toggle('selected')
        // update the count of selected seat
        updateCount();
    }

    });
    // 2. listen for change in movie selection 
    selectmovie.addEventListener('change', e => {
        ticketprice = +e.target.value;
        // update counts in the dom
        updateCount();
        savemoviedata(e.target.selectedIndex, e.target.value);
    })

