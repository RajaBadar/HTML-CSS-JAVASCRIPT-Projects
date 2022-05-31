//dom elements
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const generate = document.getElementById('generate');
const resultsHeading = document.getElementById('results-heading');
const mealsElement = document.getElementById('meals');
const selectedMeal = document.getElementById('selected-meals');

//function to search the meal using the api
function searchMeal(e){
    //prevent form submission and redirect
    e.preventDefault();
    //clear previos details for selected meal
    selectedMeal.innerHTML = '';
    //get the value from search input field
    const  searchText=search.value;
    //check if search input field is empty
    if (searchText.trim() ){
       //fetch data from api
       fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
            .then(res => res.json())
            .then(data => {
                //update results heADing
                resultsHeading.innerHTML= `<h2>Search results for ${searchText}</h2>`
             //chechk if any meals returned from api
                 if(data.meals ===null){
                 resultsHeading.innerHTML= `<h2>No results found for  ${searchText}</h2>`
                 }else{
                     meals.innerHTML = data.meals.map(meal => `
                     <div class="meal">
                     <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                     <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal} </h3>
                     </div>
                     </div>
                     `)
                     .join('')
                 }
            });
        //clear the search text
        search.value='';    
    }else{
        alert('please enter search keyword')

    }
};
//function to the render the selected Mealin the Dom
function renderMeal(meal){
    //hide the search result headings 
    resultsHeading.innerHTML='';
    //hide the search results
    mealsElement.innerHTML = '';
    //intialise array for ingerediants
    const ingredients = [];
    //loop over 20 ingredients
    for (let i =1 ; i<=20; i++){
        if (meal[`strIngredient${i}`]){
            //if ingredients exists , psuh the ingredients and measurement to the ingredients array
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        }else{
            //if the ingredients does not exist , exit the loop
            break;
        }
    } 
    //add the data to the dom
    selectedMeal.innerHTML= `
            <div class="selected-meal-details">
                 <h1>${meal.strMeal}</h1>
                 <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                 <div class="selected-meal-info">
                    ${meal.strCategory ? `<p>${meal.strCategory}</p>`:''}
                    ${meal.strArea ? `<p>${meal.strArea}</p>`:''}
                 </div>
                 <div> 
                    <h2>Instructions</h2>
                    <p>${meal.strInstructions}</p>
                    <h2>Ingredients</h2>
                    <ul>
                        ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                 </div>
            </div>
    `;
};
//ffunction to get the full details of meal using its id
function getFullDetails(mealID){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data =>{
              //save the meal data
              const meal = data.meals[0];
              
              //add the meal to the dom
              renderMeal(meal);
          })
};





//event listeners
//1. listen for form submit
submit.addEventListener('submit', searchMeal);
//2. listen for click on the element
mealsElement.addEventListener('click', e =>{
    //get all items clicked 
   const mealInfo = e.path.find(item => {
       //get only the element with class = meal-info
       if(item.classList){
           return item.classList.contains('meal-info');
       }else{
           return false
       }
       
    });
    //chexk if meal info has data
    if(mealInfo){
        //get the value from the data-mealid attribute
        const mealID= mealInfo.getAttribute('data-mealID');
        //use the mealId to get full detals of the meal
        getFullDetails(mealID);
    }
});
