
const items = [
  {
    name: "Cap",
    price: 800,
    image: "",
    colours: []
  },
  {
    name: "Crop Top",
    price: 700,
    image: "https://github.com/kagarijr/sazz-product-images/blob/main/Crop-top.jpg?raw=true",
    colours: ["Grey"]
  },
  {
    name: "T-Shirt",
    price: 850,
    image: "",
    colours: ["Brown", "Grey"]
  },
  {
    name: "Short",
    price: 700,
    image: "",
    colours: ["Brown", "Grey"]
  },
  {
    name: "Sweatpant",
    price: 1200,
    image: "https://github.com/kagarijr/sazz-product-images/blob/main/Sweatpant.jpg?raw=true",
    colours: ["Black", "Charcoal Grey", "Pink"]
  },
  {
    name: "Hoodie",
    price: 1500,
    image: "https://github.com/kagarijr/sazz-product-images/blob/main/Hoodie.jpg?raw=true",
    colours: ["Grey", "Pink"]
  },
  {
    name: "Two-Piece",
    price: 2100,
    image: "https://github.com/kagarijr/sazz-product-images/blob/main/Two-piece.jpg?raw=true",
    colours: ["Grey", "Pink"]
  }
];

let cart = [];
let selectedColours = {};

const products = document.getElementById("products");

// DISPLAY PRODUCTS
function displayProducts() {
  products.innerHTML = "";

  items.forEach((item, index) => {
    const product = document.createElement("div");
    product.className = "product";

    product.innerHTML = `
      ${item.image
        ? `<img src="${item.image}" alt="${item.name}">`
        : `<div class="product-placeholder">${item.name}</div>`
      }

      <h3>${item.name}</h3>

      <p>KSh ${item.price.toLocaleString()}</p>

     
<div class="colour-options">
  ${item.colours.length ? `
    <p class="colour-heading">AVAILABLE COLOURS</p>
    <div class="colour-list">
      ${item.colours.map(colour => `
        <button
          type="button"
          class="colour-option ${selectedColours[index] === colour ? "selected" : ""}"
          data-product="${index}"
          data-colour="${colour}"
          title="${colour}"
          style="background-color: ${
            colour === "Charcoal Grey" ? "#444" :
            colour.toLowerCase()
          };">
        </button>
      `).join("")}
    </div>
    <p class="selected-colour">
      ${selectedColours[index] || "Choose a colour"}
    </p>
  ` : ""}
</div>


      <button class="add-bag-button" data-add="${index}">
        ADD TO BAG
      </button>
    `;

    products.appendChild(product);
  });
}

// SELECT COLOUR
products.addEventListener("click", function(event) {
  const colourButton = event.target.closest(".colour-option");

  if (colourButton) {
    const index = colourButton.dataset.product;
    const colour = colourButton.dataset.colour;

    selectedColours[index] = colour;
    displayProducts();
    return;
  }

  const addButton = event.target.closest(".add-bag-button");

  if (addButton) {
    addToCart(Number(addButton.dataset.add));
  }
});

// BAG COUNT
function updateCount() {
  const count = document.getElementById("count");
  if (count) count.textContent = cart.length;
}

// ADD TO BAG

function addToCart(index) {
  const item = items[index];

  cart.push({
    ...item,
    selectedColour: selectedColours[index] || "Not selected"
  });

  updateCount();
  showMessage(item.name + " added to bag!");

  if (document.getElementById("bag-items").style.display === "block") {
    renderBag();
  }
}


// OPEN BAG

function showBag() {
  const box = document.getElementById("bag-items");

  if (box.style.display === "block") {
    box.style.display = "none";
  } else {
    box.style.display = "block";
    renderBag();
  }
}

function renderBag() {
  const box = document.getElementById("bag-items");

  if (cart.length === 0) {
    box.innerHTML = `
      <h3>YOUR BAG</h3>
      <p>Your bag is empty!</p>
      <button onclick="showBag()">CLOSE</button>
    `;
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  box.innerHTML = `
    <h3>YOUR BAG (${cart.length})</h3>

    ${cart.map((item, index) => `
      <div class="bag-item">
        <h4>${item.name}</h4>
        <p>Colour: ${item.selectedColour || "Not selected"}</p>
        <p>KSh ${item.price.toLocaleString()}</p>
        <button onclick="removeItem(${index})">
          REMOVE
        </button>
      </div>
    `).join("")}

    <h3>TOTAL: KSh ${total.toLocaleString()}</h3>
    <button onclick="checkout()">CHECKOUT</button>
    <button onclick="showBag()">CLOSE BAG</button>
  `;
}

function removeItem(index) {
  cart.splice(index, 1);

  document.getElementById("count").textContent = cart.length;

  renderBag();
  showMessage("Item removed from your bag!");
}

function showMessage(message) {
  const box = document.getElementById("message");

  box.textContent = message;
  box.style.display = "block";

  setTimeout(() => {
    box.style.display = "none";
  }, 2500);
}

// START
displayProducts();
updateCount();
