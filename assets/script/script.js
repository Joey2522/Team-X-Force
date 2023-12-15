// Variables 
let randomButton = document.getElementById('random-btn');
let favButton = document.getElementById('favorite-btn');
let resultContainer = document.getElementById('resultContainer');
let flagImage = document.getElementById('flagImage');
let recipeText = document.getElementById('recipeText');
let recipeLink = document.getElementById('recipeLink');
let currentRecipeName = ''; // Variable to store the current recipe's name

// Random Recipe Button
randomButton.addEventListener("click", async () => {
    resultContainer.style.display = "none"; // Hide previous results
    try {
        const countryResponse = await fetch("https://restcountries.com/v3.1/all");
        const countries = await countryResponse.json();
        const randomCountry = countries[Math.floor(Math.random() * countries.length)];
        const recipeResponse = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const recipeData = await recipeResponse.json();
        const randomRecipe = recipeData.meals[0];

        currentRecipeName = randomRecipe.strMeal; // Store the current recipe's name

        resultContainer.style.display = "block";
        flagImage.src = randomCountry.flags.svg;
        recipeText.textContent = `Country: ${randomCountry.name.common}`;
        recipeLink.href = randomRecipe.strSource || '#';
        recipeLink.textContent = `Full Recipe for ${randomRecipe.strMeal}`;
    } catch (error) {
        console.error("Error fetching data:", error);
        resultContainer.style.display = "block";
        recipeText.textContent = "Sorry, something went wrong. Please try again later.";
    }
});

// Save Recipe function + Local Storage code 
favButton.addEventListener('click', saveRecipe);

function saveRecipe() {
    const key = "savedRecipes";
    const existingArray = localStorage.getItem(key);
    let recipeArray = [];
    if (existingArray) {
        recipeArray = JSON.parse(existingArray);
    }
    // Store an object containing both the name and the URL of the recipe
    const recipeObject = {
        name: currentRecipeName,
        url: recipeLink.href
    };
    recipeArray.push(recipeObject);
    localStorage.setItem(key, JSON.stringify(recipeArray));
    displayFavoriteRecipes();
}

// Display Favorite Recipes
function displayFavoriteRecipes() {
    const favoriteRecipesList = document.getElementById('favorite-recipes-list');
    favoriteRecipesList.innerHTML = ''; // Clear existing list
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    
    savedRecipes.forEach(recipe => {
        const recipeItem = document.createElement('div');
        recipeItem.className = 'recipeItem';

        const recipeLink = document.createElement('a');
        recipeLink.href = recipe.url;
        recipeLink.textContent = recipe.name; // Display the recipe name
        recipeLink.target = '_blank';

        recipeItem.appendChild(recipeLink);
        favoriteRecipesList.appendChild(recipeItem);
    });
}

// Call this function to display favorites on page load
displayFavoriteRecipes();

// Clear Favorite Recipes Button
let clearRecipesButton = document.getElementById('clear-recipes-btn');

clearRecipesButton.addEventListener('click', clearFavoriteRecipes);

function clearFavoriteRecipes() {
    localStorage.removeItem('savedRecipes');
    displayFavoriteRecipes(); // Update the UI
}

