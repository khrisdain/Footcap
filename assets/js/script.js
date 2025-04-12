'use strict';

/**
 * navbar toggle
 */
const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");

const navElems = [overlay, navOpenBtn, navCloseBtn];

for (let i = 0; i < navElems.length; i++) {
  navElems[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

/**
 * header & go top btn active on page scroll
 */
const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 80) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }
});

/**
 * Cart functionality
 */
//add to cart
document.addEventListener('DOMContentLoaded', function() {
  // Get the cart badge element in the header navigation
  const cartBadge = document.querySelectorAll('.nav-action-badge')[1];
  console.log('Cart badge found:', cartBadge);
  
  // Get only the "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('button.card-action-btn[aria-labelledby="card-label-1"]');
  console.log('Add to cart buttons found:', addToCartButtons.length);
  
  if (!cartBadge || addToCartButtons.length === 0) {
    console.error('Cart badge or Add to Cart buttons not found!');
    return;
  }
  
  // Initialize cart counter (get the current value from the badge)
  let cartCounter = parseInt(cartBadge.textContent) || 0;
  console.log('Initial cart counter:', cartCounter);
  
  // Add click event listeners to all "Add to Cart" buttons
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      console.log('Add to cart button clicked!');
      
      // Increment the cart counter
      cartCounter++;
      
      // Update the cart badge text content AND the value attribute
      cartBadge.textContent = cartCounter;
      cartBadge.setAttribute('value', cartCounter);
      
      console.log('Cart counter updated to:', cartCounter);
      
 
    });
  });
});


//wishlist functionality
//load DOM data
document.addEventListener('DOMContentLoaded', function() {
  //Get the wishlist element 
  const wishList = document.querySelectorAll('.nav-action-badge')[0];
  console.log("Wishlist found:", wishList);

  //Get only the wihList button
  const addToWishList = document.querySelectorAll('button.card-action-btn[aria-labelledby="card-label-2"]');

  //log number of whislist clicked
  console.log('Add to wishlist button found:', addToWishList.length);

  //track exception
  if(!wishList || addToWishList.length === 0) {
    console.log("wishlist badge or add to wishlist button not found!");
    return;
  }

  //Initialize wishList counter (get the current value from the badge)
  let wishListCounter = parseInt(wishList.textContent) || 0;
  console.log('Initial wishlist counter:', wishListCounter);


  //add click eventlistener to all "add to wishlist" button
  addToWishList.forEach(button => {
    button.addEventListener('click', function() {
      console.log('Add to wishlist button clicked!');

      //increment the wish counter
      wishListCounter++;

      //Update the wishList badge text content and the value attribue
      wishList.textContent = wishListCounter;
      wishList.setAttribute('value', cartCounter);

      console.log('Cart counter updated to:', cartCounter);

    })
  }) 
})



