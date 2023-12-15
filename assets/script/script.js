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

// Get recipe function for dropdown
async function getRecipe(country) {
    let requestUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + country;

    try {
        const response = await fetch(requestUrl);
        const data = await response.json();

        if (!data.meals || data.meals.length === 0) {
            recipeNameEl.textContent = "No recipes found for " + country;
            recipeImgEl.src = ""; // Clear the image
            recipeLink.href = "#";
            recipeLink.textContent = "";
            return; // Exit the function
        }

        var randomIndex = Math.floor(Math.random() * data.meals.length);
        var randomMeal = data.meals[randomIndex];

        // Fetch the full details of the selected recipe
        const detailsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${randomMeal.idMeal}`);
        const detailsData = await detailsResponse.json();
        const mealDetails = detailsData.meals[0];

        // Update UI with recipe details
        recipeNameEl.textContent = mealDetails.strMeal;
        recipeImgEl.src = mealDetails.strMealThumb;
        recipeLink.href = mealDetails.strSource || `https://www.themealdb.com/meal/${mealDetails.idMeal}`;
        recipeLink.textContent = "View Recipe";
    } catch (error) {
        console.error("Error fetching recipe:", error);
        recipeNameEl.textContent = "Error loading recipes. Please try again.";
    }
}

// Dropdown button Function 
let dropDown = document.querySelector('.dropDown');
dropDown.onclick = function() {
    dropDown.classList.toggle('active');
};

// Show function for dropdown selection
async function show(anything) {
    document.querySelector('.countryInput').value = anything;
    resultContainer.style.display = "none"; // Hide previous results

    try {
        // Fetch a random country from the RestCountries API
        const countryResponse = await fetch("https://restcountries.com/v3.1/name/" + anything);
        const countryData = await countryResponse.json();
        const selectedCountry = countryData[0];

        // Update the UI with the selected country and its flag
        resultContainer.style.display = "block";
        flagImage.src = selectedCountry.flags.svg;
        recipeText.textContent = `Country: ${selectedCountry.name.common}`;

        // Fetch and display a random recipe from the selected country
        await getRecipe(anything);
    } catch (error) {
        console.error("Error fetching data:", error);
        resultContainer.style.display = "block";
        recipeText.textContent = "Sorry, something went wrong. Please try again later.";
    }
}

// Save Recipe function + Local Storage code 
favButton.addEventListener('click', saveRecipe);

function saveRecipe() {
    const key = "savedRecipes";
    const existingArray = localStorage.getItem(key);
    let recipeArray = [];
    if (existingArray) {
        recipeArray = JSON.parse(existingArray);
    }
    const value = recipeLink.textContent;
    recipeArray.push(value);
    localStorage.setItem(key, JSON.stringify(recipeArray));
    console.log(localStorage.getItem(key));
};
// get flag function - need to have flag and coutry and recipe pull up after selecting country on dropdown, same as random recipe button

// function getFlag() {
//     let requestUrl = "https://restcountries.com/v3.1/all";
    
//     fetch(requestUrl)
//     .then(function (response) {
//          return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//              for (var i = 0; i < data.meals.length; i++) 
//             var randomIndex = Math.floor(Math.random()*data.meals.length)
//             var randomMeal = data.meals[randomIndex];
//                 console.log(data)
//                 let recipeName = document.createElement('h2');
//                 let recipeImg = document.createElement('p');
//                 recipeName.textContent = randomMeal.strMeal;
//                 recipeImg.textContent = randomMeal.strMealThumb;
//                 recipeNameEl.append(recipeName);
//                 recipeImgEl.append(recipeImg);
//             }).catch(error => {
//                 console.log(error);
//     })
// };


// flagButton.addEventListener('click', getFlag);
