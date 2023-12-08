let recipeImgEl = document.getElementById('recipe-img');
let recipeNameEl = document.getElementById('recipe-name');
let randomButton = document.getElementById('random-btn');

function getRandom() {
    let requestUrl = "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian";

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
                // for (var i = 0; i < data.meals.length; i++) 
                let randomIndex = Math.floor(Math.random()*data.meals.length)
                let randomMeal = data.meals[randomIndex]
                    console.log("here")
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

randomButton.addEventListener('click', getRandom);  





