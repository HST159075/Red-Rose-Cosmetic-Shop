// ==========================
// Search Input Toggle
// ==========================
const searchIcon = document.querySelector(".search-icon");
const searchInput = document.querySelector(".search-input");

searchIcon.addEventListener("click", () => {
  searchInput.classList.toggle("active");
  searchInput.focus(); // click করলে সরাসরি টাইপ করতে পারবেন
});

// ==========================
// Slideshow Section
// ==========================
let slideIndex = 0;
showSlides();

function showSlides() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => (slide.style.display = "none"));

  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;

  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000); // 3 seconds per slide
}

// ==========================
// Fetch Products from JSON
// ==========================
fetch("products.json")
  .then((res) => res.json())
  .then((products) => {
    const container = document.querySelector(".flex-box");
    products.forEach((product) => {
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
      container.appendChild(card);

      // Hover Image Swap
      const mainImg = card.querySelector(".main-img");
      const hoverImg = card.querySelector(".hover-img");

      if (hoverImg) {
        card.querySelector(".product-image").addEventListener("mouseenter", () => {
          mainImg.style.display = "none";
          hoverImg.style.display = "block";
        });
        card.querySelector(".product-image").addEventListener("mouseleave", () => {
          mainImg.style.display = "block";
          hoverImg.style.display = "none";
        });
        hoverImg.style.display = "none"; // hide hover img initially
      }
    });
  })
  .catch((err) => console.error("Error loading products:", err));
