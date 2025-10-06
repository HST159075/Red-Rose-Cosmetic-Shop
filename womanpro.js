const productContainer = document.getElementById("product-container");
let allProducts = [];

// Load products JSON
fetch("womanpro.json")
  .then(res => res.json())
  .then(products => {
    allProducts = products;
    showProducts(); // সব products একবারে দেখাবে
  })
  .catch(err => console.error("Error loading products:", err));

function showProducts() {
  productContainer.innerHTML = ""; // আগে থাকা products remove

  allProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        <img class="main-img" src="${product.main_img}" alt="${product.name}">
        <img class="hover-img" src="${product.hover_img}" alt="${product.name} Hover">
        <button class="add-cart">Add to Cart</button>
      </div>
      <p>
        ${product.name}<br>
        <span class="regular-price">৳${product.regular_price}</span>
        <span class="sale-price">৳${product.sale_price}</span>
      </p>
    `;
    productContainer.appendChild(card);

    // Hover effect
    const mainImg = card.querySelector(".main-img");
    const hoverImg = card.querySelector(".hover-img");
    if (hoverImg) {
      hoverImg.style.display = "none";
      card.querySelector(".product-image").addEventListener("mouseenter", () => {
        mainImg.style.display = "none";
        hoverImg.style.display = "block";
      });
      card.querySelector(".product-image").addEventListener("mouseleave", () => {
        mainImg.style.display = "block";
        hoverImg.style.display = "none";
      });
    }
  });
}
