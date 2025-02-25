
const recipeForm = document.getElementById("recipe-form");
const recipeNameInput = document.getElementById("recipe-name");
const recipeIngredientsInput = document.getElementById("recipe-ingredients");
const recipeList = document.getElementById("recipe-list");
const recipeSelect = document.getElementById("recipe-select");
const sauceInput = document.getElementById("sauce");
const sendOrderButton = document.getElementById("send-order");
const orderList = document.getElementById("order-list");

let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
let orders = [];

function saveRecipesToLocalStorage() {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

function saveOrdersToLocalStorage() {
    localStorage.setItem("orders", JSON.stringify(orders));
}


function loadOrdersFromLocalStorage() {
    const storedOrders = JSON.parse(localStorage.getItem("orders"));
    if (storedOrders) {
        orders = storedOrders;
    }
}


recipeForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = recipeNameInput.value.trim();
    const ingredients = recipeIngredientsInput.value.trim();

    if (name && ingredients) {
        const recipe = { name, ingredients };
        recipes.push(recipe);
        saveRecipesToLocalStorage();
        updateRecipeList();
        updateRecipeSelect();
    }

    recipeNameInput.value = "";
    recipeIngredientsInput.value = "";
});


function updateRecipeList() {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = ""; 

    recipes.forEach((recipe, index) => {

        const card = document.createElement("div");
        card.className = "col-md-4"; 

        const cardBody = document.createElement("div");
        cardBody.className = "recipe-card";


        const title = document.createElement("strong");
        title.textContent = `🍽️ ${recipe.name}`;
        cardBody.appendChild(title);


        const ingredientList = document.createElement("ul");
        recipe.ingredients.split(",").forEach((ingredient) => {
            const ingredientItem = document.createElement("li");
            ingredientItem.textContent = `- ${ingredient.trim()}`;
            ingredientList.appendChild(ingredientItem);
        });
        cardBody.appendChild(ingredientList);


        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.className = "delete-button";
        deleteButton.onclick = () => deleteRecipe(index);
        cardBody.appendChild(deleteButton);
        card.appendChild(cardBody);
        recipeList.appendChild(card);
    });
}



function deleteRecipe(index) {
    recipes.splice(index, 1);
    saveRecipesToLocalStorage();
    updateRecipeList();
    updateRecipeSelect();
}


function updateRecipeSelect() {
    recipeSelect.innerHTML = `<option value="">-- Choisissez une recette --</option>`;

    recipes.forEach((recipe, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = recipe.name;
        recipeSelect.appendChild(option);
    });
}

sendOrderButton.addEventListener("click", async () => {
    const selectedRecipeIndex = recipeSelect.value;
    const sauce = sauceInput.value.trim();

    if (selectedRecipeIndex === "" || !sauce) {
        alert("Veuillez sélectionner une recette et indiquer une sauce !");
        return;
    }

    const recipe = recipes[selectedRecipeIndex];
    let timestamp;

    try {
        const res = await fetch("https://timeapi.io/api/Time/current/zone?timeZone=Europe/Paris");
        if (!res.ok) throw new Error("Erreur avec l'API TimeAPI.");
        const data = await res.json();
        timestamp = new Date(data.dateTime).getTime();
    } catch (error) {
        console.error("Erreur avec l'API TimeAPI. Utilisation de l'heure locale.", error);
        timestamp = Date.now();
    }

    const order = {
        id: Date.now(),
        recipe,
        sauce,
        timestamp
    };

    orders.push(order);
    saveOrdersToLocalStorage();
    updateOrderList();
    sauceInput.value = "";
});

function updateOrderList() {
    orderList.innerHTML = ""; 

    orders.forEach((order) => {
        const li = document.createElement("li");


        const title = document.createElement("strong");
        title.textContent = `🍽️ Recette : ${order.recipe.name}`;

  
        const time = document.createElement("span");
        time.textContent = `🕒 Commande prise à : ${new Date(order.timestamp).toLocaleTimeString()}`;


        const sauce = document.createElement("span");
        sauce.textContent = `🌶️ Sauce : ${order.sauce}`;


        const timer = document.createElement("span");
        timer.id = `timer-${order.id}`;
        timer.textContent = "00:00";

   
        const validateButton = document.createElement("button");
        validateButton.textContent = "✅ Valider";
        validateButton.onclick = () => validateOrder(order.id);


        li.appendChild(title);
        li.appendChild(time);
        li.appendChild(document.createTextNode(" "));
        li.appendChild(timer);
        li.appendChild(sauce);
        li.appendChild(validateButton);

        orderList.appendChild(li);

    
        updateTimer(order.id, order.timestamp);
    });
}


function updateTimer(orderId, timestamp) {
    setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - timestamp) / 1000);
        const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
        const seconds = String(elapsed % 60).padStart(2, "0");

        const timerElement = document.getElementById(`timer-${orderId}`);
        if (timerElement) {
            timerElement.textContent = `${minutes}:${seconds}`;
        }
    }, 1000);
}

function validateOrder(orderId) {
    orders = orders.filter((order) => order.id !== orderId);
    saveOrdersToLocalStorage();
    updateOrderList();
}

const themeToggleButton = document.getElementById("theme-toggle");

let isDarkMode = JSON.parse(localStorage.getItem("isDarkMode")) ?? true;

function applyTheme() {
    if (isDarkMode) {
        document.body.classList.remove("light");
        document.querySelectorAll(".card-body, .recipe-card, .list-group-item, .delete-button, .btn, .card-title").forEach(el => {
            el.classList.remove("light");
        });
        themeToggleButton.textContent = "Basculer en mode clair";
    } else {
        document.body.classList.add("light");
        document.querySelectorAll(".card-body, .recipe-card, .list-group-item, .delete-button, .btn, .card-title").forEach(el => {
            el.classList.add("light");
        });
        themeToggleButton.textContent = "Basculer en mode sombre";
    }
}

themeToggleButton.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode)); 
    applyTheme();
});

applyTheme();
loadOrdersFromLocalStorage();
updateRecipeList();
updateRecipeSelect();
updateOrderList();
