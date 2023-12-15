// SCRIPT //

// Variables 

let recipeLinkEl = document.getElementById('recipe-link');
let recipeNameEl = document.getElementById('recipe-name');
let randomButton = document.getElementById('random-btn');
let flagButton = document.getElementById('generate-btn');
let favButton = document.getElementById('favorite-btn');
let recipeImgEl = document.getElementById('recipe-img');
let flagEl = document.getElementById('flag');
let countryNameEl = document.getElementById('country-name');
let resultContainer = document.getElementById('resultContainer');
let flagImage = document.getElementById('flagImage');
let recipeText = document.getElementById('recipeText');
let recipeLink = document.getElementById('recipeLink');
let recipeButton = document.getElementById('get-recipe-btn');


let recipeUrlLink;

// RANDOM RECIPE BUTTON 

randomButton.addEventListener("click", async () => {
    resultContainer.style.display = "none"; // Hide previous results

    try {
        // Fetch a random country from the RestCountries API
        const countryResponse = await fetch("https://restcountries.com/v3.1/all");
        const countries = await countryResponse.json();
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];

        // Fetch a random recipe from the MealDB API
        const recipeResponse = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const recipeData = await recipeResponse.json();
        const randomRecipe = recipeData.meals[0];

        // Update the UI with the random country and its flag
        resultContainer.style.display = "block";
        flagImage.src = randomCountry.flags.svg;
        recipeText.textContent = `Country: ${randomCountry.name.common}`;

        if (randomRecipe) {
            recipeLink.href = randomRecipe.strSource || '#'; // Use '#' if strSource is undefined
            recipeLink.textContent = `Full Recipe for ${randomRecipe.strMeal}`;
        } else {
            recipeLink.href = '#';
            recipeLink.textContent = 'Explore More Recipes';
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        resultContainer.style.display = "block";
        recipeText.textContent = "Sorry, something went wrong. Please try again later.";
    }
});

// get recipe function for drop down

// function getRecipe(country) {
//     let requestUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + country;
    
//     fetch(requestUrl)
//     .then(function (response) {
//          return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//              for (var i = 0; i < data.meals.length; i++) 
//             var randomIndex = Math.floor(Math.random()*data.meals.length)
//             var randomMeal = data.meals[randomIndex];
//                 let recipeName = document.createElement('h2');
//                 recipeLink = document.createElement('p');
//                 recipeName.textContent = randomMeal.strMeal;
//                 recipeLink.textContent = randomMeal.strMealThumb;
//                 recipeNameEl.append(recipeName);
//                 recipeLinkEl.append(recipeLink);
//             }).catch(error => {
//                 console.log(error);
//     })
// };
// Local 
// Dropdown button Fuction 

// let dropDown = document.querySelector('.dropDown');
// dropDown.onclick = function() {
//     dropDown.classList.toggle('active');
// };

// function show(anything) {
//     document.querySelector('.countryInput').value = anything;
//     getRecipe(anything);
//     console.log(anything);
// }

// Save Recipe function + Local Storage code 

favButton.addEventListener('click', saveRecipe);

// function saveRecipe() {
//     const key = "savedRecipes";
//     const existingArray = localStorage.getItem(key);
//     let recipeArray = []
//     if (existingArray) {
//         recipeArray = JSON.parse(existingArray);
//     }
//     const value = recipeLink.textContent;
//     recipeArray.push(value);
//     localStorage.setItem(key, JSON.stringify(recipeArray));
//     localStorage.getItem(key);
//     console.log(localStorage.getItem(key));
// };

function saveRecipe() {
    const key = "savedRecipes";
    const existingArray = localStorage.getItem(key);
    let recipeArray = []
    if (existingArray) {
        recipeArray = JSON.parse(existingArray);
    }
    const value = recipeLink.href;
    recipeArray.push(value);
    localStorage.setItem(key, JSON.stringify(recipeArray));
    localStorage.getItem(key);
    console.log(localStorage.getItem(key));
};



