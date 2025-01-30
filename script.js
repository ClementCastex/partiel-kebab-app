
const recipeForm = document.getElementById("recipe-form");
const recipeNameInput = document.getElementById("recipe-name");
const recipeIngredientsInput = document.getElementById("recipe-ingredients");
const recipeList = document.getElementById("recipe-list");

let recipes = [];


recipeForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const name = recipeNameInput.value.trim();
    const ingredients = recipeIngredientsInput.value.trim();

    if (name && ingredients) {
        const recipe = { name, ingredients };
        recipes.push(recipe); 
        updateRecipeList(); 
    }


    recipeNameInput.value = "";
    recipeIngredientsInput.value = "";
});


function updateRecipeList() {
    recipeList.innerHTML = ""; 

    recipes.forEach((recipe, index) => {
        const li = document.createElement("li");

        const title = document.createElement("strong");
        title.textContent = `🍽️ ${recipe.name}`;

        const ingredientList = document.createElement("ul");
        recipe.ingredients.split(",").forEach(ingredient => {
            const ingredientItem = document.createElement("li");
            ingredientItem.textContent = `- ${ingredient.trim()}`;
            ingredientList.appendChild(ingredientItem);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.onclick = () => deleteRecipe(index);


        li.appendChild(title);
        li.appendChild(ingredientList);
        li.appendChild(deleteButton);
        
        recipeList.appendChild(li);
    });
}


function deleteRecipe(index) {
    recipes.splice(index, 1);
    updateRecipeList();
}
