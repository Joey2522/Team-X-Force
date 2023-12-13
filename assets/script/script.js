// SCRIPT //

// Variables 

let recipeImgEl = document.getElementById('recipe-img');
let recipeNameEl = document.getElementById('recipe-name');
let flagEl = document.getElementById('flag');
let countryNameEl = document.getElementById('country-name');
let randomButton = document.getElementById('random-btn');
let resultContainer = document.getElementById('resultContainer');
let flagImage = document.getElementById('flagImage');
let recipeText = document.getElementById('recipeText');
let recipeLink = document.getElementById('recipeLink');
let recipeButton = document.getElementById('get-recipe-btn');
let flagButton = document.getElementById('generate-btn');
let optionsArray = ["United States", "Egypt", "Italy", "Spain", "Britain", "Brazil", "Russia", "China", "Thailand", "Jamaica"];


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


// DROPDOWN MENU 

let dropDown = document.querySelector('.dropDown');
dropDown.onclick = function(){
    dropDown.classList.toggle('active');
};

function show(anything) {
    document.querySelector('.countryInput').value = anything;
}




// FAVORITE RECIPE 


