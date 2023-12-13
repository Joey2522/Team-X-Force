let recipeLinkEl = document.getElementById('recipe-link');
let recipeNameEl = document.getElementById('recipe-name');
let randomButton = document.getElementById('random-btn');
let flagButton = document.getElementById('generate-btn');
let favButton = document.getElementById('favorite-btn');
let recipeLink;


// let dropDown = document.getElementById('country-input');

    // for (var i = 0; i < optionsArray.length; i++)
    //     var option = document.createElement("option");
    //     option.value = optionsArray[i];
    //     option.text = optionsArray[i];
    //     dropDown.appendChild(option);


function getRandom() {
    let requestUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian";

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
            for (var i = 0; i < data.meals.length; i++) 
            var randomIndex = Math.floor(Math.random()*data.meals.length);
            var randomMeal = data.meals[randomIndex];
                let recipeName = document.createElement('h2');
                let recipeImg = document.createElement('p');
                recipeName.textContent = randomMeal.strMeal;
                recipeImg.textContent = randomMeal.strMealThumb;
                recipeNameEl.append(recipeName);
                recipeImgEl.append(recipeImg);
            }).catch(error => {
                console.log(error);
    })
};

function getRecipe(country) {
    let requestUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + country;
    
    fetch(requestUrl)
    .then(function (response) {
         return response.json();
    })
    .then(function (data) {
        console.log(data);
             for (var i = 0; i < data.meals.length; i++) 
            var randomIndex = Math.floor(Math.random()*data.meals.length)
            var randomMeal = data.meals[randomIndex];
                let recipeName = document.createElement('h2');
                recipeLink = document.createElement('p');
                recipeName.textContent = randomMeal.strMeal;
                recipeLink.textContent = randomMeal.strMealThumb;
                recipeNameEl.append(recipeName);
                recipeLinkEl.append(recipeLink);
            }).catch(error => {
                console.log(error);
    })
};

function getFlag() {
    let requestUrl = "https://restcountries.com/v3.1/all";
    
    fetch(requestUrl)
    .then(function (response) {
         return response.json();
    })
    .then(function (data) {
        console.log(data);
             for (var i = 0; i < data.meals.length; i++) 
            // var randomIndex = Math.floor(Math.random()*data.meals.length)
            // var randomMeal = data.meals[randomIndex];
                console.log(data)
                let recipeName = document.createElement('h2');
                let recipeImg = document.createElement('p');
                recipeName.textContent = randomMeal.strMeal;
                recipeImg.textContent = randomMeal.strMealThumb;
                recipeNameEl.append(recipeName);
                recipeImgEl.append(recipeImg);
            }).catch(error => {
                console.log(error);
    })
};


// flagButton.addEventListener('click', getFlag);

let dropDown = document.querySelector('.dropDown');
dropDown.onclick = function() {
    dropDown.classList.toggle('active');
};

function show(anything) {
    document.querySelector('.countryInput').value = anything;
    getRecipe(anything);
    console.log(anything);
}

favButton.addEventListener('click', saveRecipe);

function saveRecipe() {
    const key = "savedRecipes";
    const existingArray = localStorage.getItem(key);
    let recipeArray = []
    if (existingArray) {
        recipeArray = JSON.parse(existingArray);
    }
    const value = recipeLink.textContent;
    recipeArray.push(value);
    localStorage.setItem(key, JSON.stringify(recipeArray));
    localStorage.getItem(key);
    console.log(localStorage.getItem(key));
};


    
      //allows the saved text to remain in the local storage even after a page refresh
    // $('.time-block').each(function() {
    //     const key = $(this).attr('id');
    //     const value = localStorage.getItem(key);
    //     $(this).children('.description').val(value);
// });

