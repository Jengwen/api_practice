// const food=["BLT", "hamburger", "salad", "hot dog", "cheesecake"]

// food.forEach(oneFood =>  console.log(oneFood));


    fetch("http://localhost:8088/food")
    .then(response => response.json())
    .then(myParsedFoods => {
        myParsedFoods.forEach(food => {

            // Now fetch the food from the Food API
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    if (productInfo.product.ingredients_text) {
                      food.ingredients = productInfo.product.ingredients_text
                    } else {
                      food.ingredients = "no ingredients listed"
                    }
// fetch country of origin
    if (productInfo.product.countries) {
      food.country = productInfo.product.countries
    } else {
      food.country = "no country listed"
    }
 

                    // Build HTML string for individual food
                    document.querySelector(".foodList").innerHTML += `<div class = "foodBox">
                    <p class="foodItem" id="food-name">${food.name}</p>
                    <p class= "foodItem" id= "food-category">${food.category}</p>
                    <p class = "foodItem" id= "food-ethnicity">${food.ethnicity}</p>
                    <p class = "foodItem" id="food-ingredients">${food.ingredients}</p>
                    <p class = "foodItem" id="food-country">${food.country}</p>
                    </div>`

                    // Add HTML string to DOM
                    
                })
        })
    })
