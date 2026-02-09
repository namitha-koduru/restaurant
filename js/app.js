/*********************************
   LUCCICA RESTAURANT - USER JS
**********************************/

let cart = [];

/* ---------- FEEDBACK STORAGE ---------- */
let feedbacks = JSON.parse(localStorage.getItem("luccica_feedbacks")) || [];

/* ---------- RANDOM RATING ---------- */
function randomRating() {
  return (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
}

/* ---------- MENU DATA ---------- */

let menu = JSON.parse(localStorage.getItem("luccica_menu")) || {};

/* ---- FORCE ALL CATEGORIES ---- */

menu.breakfast = menu.breakfast || [
  { id: 1, name: "Idli & Sambar", price: 50, active: true },
  { id: 2, name: "Plain Dosa", price: 60, active: true },
  { id: 3, name: "Masala Dosa", price: 80, active: true }
];

menu.lunch = menu.lunch || [
  { id: 6, name: "Veg Biryani", price: 160, active: true },
  { id: 7, name: "Chicken Biryani", price: 220, active: true }
];

menu.dinner = menu.dinner || [
  { id: 11, name: "Butter Chicken", price: 240, active: true },
  { id: 12, name: "Paneer Butter Masala", price: 200, active: true }
];

menu.soups = menu.soups || [
  { id: 15, name: "Tomato Soup", price: 90, active: true }
];

menu.snacks = menu.snacks || [
  { id: 19, name: "French Fries", price: 80, active: true }
];

menu.drinks = menu.drinks || [
  { id: 25, name: "Cold Coffee", price: 90, active: true }
];

localStorage.setItem("luccica_menu", JSON.stringify(menu));

/* ---------- SHOW MENU ---------- */

function showMenu(type, btn) {
  document.querySelectorAll(".menu-tabs button")
    .forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const box = document.getElementById("menu-items");
  box.innerHTML = "";

  menu[type].forEach(item => {
    if (item.active) {
      box.innerHTML += `
        <div class="menu-card">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
          <p class="rating">⭐ ${randomRating()}</p>

          <textarea id="fb-${item.id}" placeholder="Write your feedback..."></textarea>

          <button class="btn main-btn" onclick="sendFeedback(${item.id}, '${item.name}')">
            Send Feedback
          </button>

          <button class="btn cart-btn" onclick="addToCart(${item.id})">
            Add to Cart
          </button>
        </div>
      `;
    }
  });
}

/* ---------- SEND FEEDBACK ---------- */

function sendFeedback(id, name) {
  const msg = document.getElementById("fb-" + id).value.trim();
  if (msg === "") {
    alert("Please enter feedback");
    return;
  }

  feedbacks.push({
    item: name,
    message: msg,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("luccica_feedbacks", JSON.stringify(feedbacks));
  document.getElementById("fb-" + id).value = "";
  alert("Feedback sent to admin ✅");
}

/* ---------- ADD TO CART ---------- */

function addToCart(id) {
  for (let cat in menu) {
    for (let item of menu[cat]) {
      if (item.id === id) {
        cart.push(item);
        document.getElementById("cartCount").innerText = cart.length;
        alert(item.name + " added to cart ✅");
        return;
      }
    }
  }
}

/* ---------- OPEN CART ---------- */

function openCart() {
  let total = 0;
  let list = "";

  if (cart.length === 0) {
    list = "<li>Your cart is empty</li>";
  } else {
    cart.forEach(item => {
      total += item.price;
      list += `<li>🍽️ ${item.name} - ₹${item.price}</li>`;
    });
  }

  document.getElementById("cartItems").innerHTML = list;
  document.getElementById("cartTotal").innerHTML =
    "<strong>Grand Total: ₹" + total + "</strong>";

  document.getElementById("cartPopup").style.display = "flex";
}

/* ---------- DEFAULT LOAD ---------- */

document.addEventListener("DOMContentLoaded", () => {
  let firstBtn = document.querySelector(".menu-tabs button");
  showMenu("breakfast", firstBtn);
});
