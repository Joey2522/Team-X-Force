let recipeImgEl = document.getElementById('recipe-img');
let recipeNameEl = document.getElementById('recipe-name');
// let randomButton = document.getElementById('random-btn');
let flagButton = document.getElementById('generate-btn');
let favButton = document.getElementById('favorite-btn');

// let dropDown = document.getElementById('country-input');

    // for (var i = 0; i < optionsArray.length; i++)
    //     var option = document.createElement("option");
    //     option.value = optionsArray[i];
    //     option.text = optionsArray[i];
    //     dropDown.appendChild(option);


// function getRandom() {
//     let requestUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian";

//     fetch(requestUrl)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//             for (var i = 0; i < data.meals.length; i++) 
//             var randomIndex = Math.floor(Math.random()*data.meals.length);
//             var randomMeal = data.meals[randomIndex];
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
                let recipeImg = document.createElement('p');
                recipeName.textContent = randomMeal.strMeal;
                recipeImg.textContent = randomMeal.strMealThumb;
                recipeNameEl.append(recipeName);
                recipeImgEl.append(recipeImg);
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

// randomButton.addEventListener('click', getRandom);
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
    //saves the entered text to the local storage when the save button is hit
// function saveRecipe() {
//     $('favorite-btn').on('click', function() {
//         const key = $(this).parent().attr('id');
//         const value = $(this).siblings('.description').val();
//         localStorage.setItem(key, value);
//         console.log(favorite);
//     });
// }

function saveRecipe() {
    var chosenRecipe = document.querySelector();
    localStorage.setItem('myData', JSON.stringify(chosenRecipe));
}
    
      //allows the saved text to remain in the local storage even after a page refresh
    $('.time-block').each(function() {
        const key = $(this).attr('id');
        const value = localStorage.getItem(key);
        $(this).children('.description').val(value);
});

// saveRecipe();
