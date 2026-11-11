
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
    colours: [
      { name: "Grey", image: "" }
    ]
  },
  {
    name: "T-Shirt",
    price: 850,
    image: "",
    colours: [
      { name: "Brown", image: "" },
      { name: "Grey", image: "" }
    ]
  },
  {
    name: "Short",
    price: 700,
    image: "",
    colours: [
      { name: "Brown", image: "" },
      { name: "Grey", image: "" }
    ]
  },
  {
    name: "Sweatpant",
    price: 1200,
    image: "https://github.com/kagarijr/sazz-product-images/blob/main/Sweatpant.jpg?raw=true",
    colours: [
      { name: "Black", image: "" },
      { name: "Charcoal Grey", image: "" },
      { name: "Pink", image: "" }
    ]
  },
  {
    name: "Hoodie",
    price: 1500,
    image: "https://github.com/kagarijr/sazz-product-images/blob/main/Hoodie.jpg?raw=true",
    colours: [
      { name: "Grey", image: "" },
      { name: "Pink", image: "" }
    ]
  },
  {
    name: "Two-Piece",
    price: 2100,
    image: "https://github.com/kagarijr/sazz-product-images/blob/main/Two-piece.jpg?raw=true",
    colours: [
      { name: "Grey", image: "" },
      { name: "Pink", image: "" }
    ]
  }
];


let cart = [];

const products = document.getElementById("products");

// Display products
items.forEach((item, index) => {
  products.innerHTML += `
    <div class="product">
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>KSh ${item.price.toLocaleString()}</p>
      <button onclick="addToCart(${index})">
        ADD TO BAG
      </button>
    </div>
  `;
});

// Update bag count
function updateCount() {
  document.getElementById("count").textContent = cart.length;
}

// Add product
function addToCart(index) {
  cart.push(items[index]);
  updateCount();
  showMessage(items[index].name + " added to bag!");
}

// Open and close bag
function showBag() {
  const box = document.getElementById("bag-items");

  if (box.style.display === "block") {
    box.style.display = "none";
  } else {
    box.style.display = "block";
    renderBag();
  }
}

// Display bag contents
function renderBag() {
  const box = document.getElementById("bag-items");

  if (cart.length === 0) {
    box.innerHTML = `
      <h3>YOUR BAG</h3>
      <p>Your bag is empty!</p>
    `;
    return;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price, 0
  );

  box.innerHTML = `
    <h3>YOUR BAG</h3>

    ${cart.map((item, index) => `
      <div class="bag-item">
        <p>${item.name}</p>
        <p>KSh ${item.price.toLocaleString()}</p>

        <button class="remove-btn"
          onclick="removeItem(${index})">
          REMOVE
        </button>
      </div>
    `).join("")}

    <h3>Total: KSh ${total.toLocaleString()}</h3>

    <button class="checkout-btn" onclick="checkout()">
      CHECKOUT WITH WHATSAPP
    </button>
  `;
}

// Remove product
function removeItem(index) {
  cart.splice(index, 1);
  updateCount();
  renderBag();
  showMessage("Item removed from bag!");
}

// WhatsApp checkout
function checkout() {
  if (cart.length === 0) {
    showMessage("Your bag is empty!");
    return;
  }

  const summary = cart.map(item =>
    item.name + " - KSh " + item.price
  ).join("\n");

  const total = cart.reduce(
    (sum, item) => sum + item.price, 0
  );

  // Replace with your approved business WhatsApp number
  const phone = "2547XXXXXXXX";

  const message =
    "Hello SAZZ! I want to order:\n" +
    summary + "\nTotal: KSh " + total;

  window.open(
    "https://wa.me/" + phone +
    "?text=" + encodeURIComponent(message),
    "_blank"
  );
}

// Notification
function showMessage(text) {
  const box = document.getElementById("message");

  box.textContent = text;
  box.style.display = "block";

  setTimeout(() => {
    box.style.display = "none";
  }, 2500);
}
