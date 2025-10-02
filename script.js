const searchIcon = document.querySelector('.search-icon');
const searchInput = document.querySelector('.search-input');

searchIcon.addEventListener('click', () => {
  searchInput.classList.toggle('active');
  searchInput.focus(); // click করলে সরাসরি টাইপ করতে পারবেন
});
// section slidshow//
let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.querySelectorAll(".slide");
  slides.forEach(slide => slide.style.display = "none");
  
  slideIndex++;
  if(slideIndex > slides.length) { slideIndex = 1; }

  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 3000); // 3 seconds per slide
}
// fetch product.json
fetch("products.json")
  .then(res => res.json())
  .then(products => {
    const container = document.querySelector(".flex-box");
    products.forEach(p => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-image">
          <img src="${p.image}" alt="${p.name}">
          <button class="add-cart">Add to Cart</button>
        </div>
        <p>
          ${p.name}<br>
          <span class="regular-price">৳${p.regular_price}</span>
          <span class="sale-price">৳${p.sale_price}</span>
        </p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error("Error loading products:", err));
