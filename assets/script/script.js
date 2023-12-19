// Variables 
let randomButton = document.getElementById('random-btn');
let favButton = document.getElementById('favorite-btn');
let resultContainer = document.getElementById('resultContainer');
let flagImage = document.getElementById('flagImage');
let recipeText = document.getElementById('recipeText');
let recipeLink = document.getElementById('recipeLink');
let currentRecipeName = ''; // Variable to store the current recipe's name

// Function to map cuisine to country
function mapCuisineToCountry(cuisine) {
    const cuisineCountryMap = {
        "Italian": "Italy",
        "Chinese": "China",
        "Indian": "India",
        "Japanese": "Japan",
        "French": "France",
        "American": "United States",
        "Mexican": "Mexico",
        "Spanish": "Spain",
        "Thai": "Thailand",
        "Mediterranean": "Greece",
        "English": "United Kingdom",
        "Moroccan": "Morocco",
        "Greek": "Greece",
        "German": "Germany",
        "Korean": "South Korea",
        "Vietnamese": "Vietnam",
        "Brazilian": "Brazil",
        "Turkish": "Turkey",
        "Swedish": "Sweden",
        "Polish": "Poland",
        "Russian": "Russia",
        "Canadian": "Canada",
        "Portuguese": "Portugal",
        "Irish": "Ireland",
        "Belgian": "Belgium",
        "Finnish": "Finland",
        "Cuban": "Cuba",
        "Filipino": "Philippines",
        "Jamaican": "Jamaica",
        "Pakistani": "Pakistan",
        "Austrian": "Austria",
        "South African": "South Africa",
        "Norwegian": "Norway",
        "Argentinian": "Argentina",
        "Dutch": "Netherlands",
        "Ethiopian": "Ethiopia",
        "Hungarian": "Hungary",
        "Persian": "Iran",
        "Israeli": "Israel",
        "Malaysian": "Malaysia",
        "Peruvian": "Peru",
        "Taiwanese": "Taiwan",
        "Venezuelan": "Venezuela",
        "Egyptian": "Egypt",
        "Danish": "Denmark",
        "Indonesian": "Indonesia",
        "Lebanese": "Lebanon",
        "New Zealand": "New Zealand",
        "Romanian": "Romania",
        "Sri Lankan": "Sri Lanka",
        "Australian": "Australia",
        "Bangladeshi": "Bangladesh",
        "Nigerian": "Nigeria",
        "Singaporean": "Singapore",
        "Swiss": "Switzerland",
        "Ukrainian": "Ukraine",
        "Afghan": "Afghanistan",
        "Algerian": "Algeria",
        "Armenian": "Armenia",
        "Azerbaijani": "Azerbaijan",
        "Bahraini": "Bahrain",
        "Burmese": "Myanmar",
        "Chilean": "Chile",
        "Colombian": "Colombia",
        "Croatian": "Croatia",
        "Czech": "Czech Republic",
        "Ecuadorian": "Ecuador",
        "Estonian": "Estonia",
        "Georgian": "Georgia",
        "Ghanaian": "Ghana",
        "Haitian": "Haiti",
        "Icelandic": "Iceland",
        "Jordanian": "Jordan",
        "Kazakh": "Kazakhstan",
        "Kenyan": "Kenya",
        "Latvian": "Latvia",
        "Libyan": "Libya",
        "Lithuanian": "Lithuania",
        "Luxembourgish": "Luxembourg",
        "Macedonian": "North Macedonia",
        "Maltese": "Malta",
        "Mongolian": "Mongolia",
        "Nepalese": "Nepal",
        "Omani": "Oman",
        "Qatari": "Qatar",
        "Saudi": "Saudi Arabia",
        "Slovak": "Slovakia",
        "Slovenian": "Slovenia",
        "Somali": "Somalia",
        "Sudanese": "Sudan",
        "Syrian": "Syria",
        "Tanzanian": "Tanzania",
        "Tunisian": "Tunisia",
        "Ugandan": "Uganda",
        "Uruguayan": "Uruguay",
        "Uzbek": "Uzbekistan",
        "Yemeni": "Yemen",
        "Zambian": "Zambia",
        "Zimbabwean": "Zimbabwe",
    };
    return cuisineCountryMap[cuisine] || cuisine; // Default to cuisine if no mapping found
}

// Random Recipe Button
randomButton.addEventListener("click", async () => {
    resultContainer.style.display = "none"; // Hide previous results
    try {
        // Fetch a random recipe
        const recipeResponse = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const recipeData = await recipeResponse.json();
        const randomRecipe = recipeData.meals[0];

        // Get country name from recipe's cuisine
        const countryName = mapCuisineToCountry(randomRecipe.strArea);

        // Fetch country information
        const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const countryData = await countryResponse.json();
        const country = countryData[0];

        // Update UI with recipe and country information
        currentRecipeName = randomRecipe.strMeal;
        resultContainer.style.display = "block";
        flagImage.src = country.flags.svg;
        recipeText.textContent = `Country: ${country.name.common} - ${randomRecipe.strMeal}`;
        recipeLink.href = randomRecipe.strSource || randomRecipe.strYoutube || '#';
        recipeLink.textContent = 'View Recipe';
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
