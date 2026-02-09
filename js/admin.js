let menu = JSON.parse(localStorage.getItem("luccica_menu")) || {};
let feedbacks = JSON.parse(localStorage.getItem("luccica_feedbacks")) || [];

function saveMenu() {
  localStorage.setItem("luccica_menu", JSON.stringify(menu));
  renderMenu();
}

/* ---------- ADD FOOD ---------- */

function addFood() {
  if (foodName.value === "" || foodPrice.value === "") {
    alert("Enter food name and price");
    return;
  }

  menu[foodCategory.value].push({
    id: Date.now(),
    name: foodName.value,
    price: Number(foodPrice.value),
    active: true
  });

  foodName.value = "";
  foodPrice.value = "";
  saveMenu();
}

/* ---------- TOGGLE ITEM ---------- */

function toggle(cat, id) {
  menu[cat].forEach(item => {
    if (item.id === id) item.active = !item.active;
  });
  saveMenu();
}

/* ---------- RENDER MENU ---------- */

function renderMenu() {
  adminList.innerHTML = "";
  for (let cat in menu) {
    menu[cat].forEach(item => {
      adminList.innerHTML += `
        <div class="menu-card">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
          <p>${cat.toUpperCase()}</p>
          <button onclick="toggle('${cat}', ${item.id})">
            ${item.active ? "Disable" : "Enable"}
          </button>
        </div>
      `;
    });
  }
}

/* ---------- SHOW FEEDBACK ---------- */

document.body.innerHTML += `<h2 style="text-align:center">Customer Feedback</h2>
<div id="feedbackBox" class="menu-grid"></div>`;

let box = document.getElementById("feedbackBox");

if (feedbacks.length === 0) {
  box.innerHTML = "<p style='text-align:center'>No feedback yet</p>";
}

feedbacks.forEach(f => {
  box.innerHTML += `
    <div class="menu-card">
      <h3>${f.item}</h3>
      <p>${f.message}</p>
      <small>${f.time}</small>
    </div>
  `;
});

renderMenu();
