const API = "https://sreelakshmi-backend.onrender.com";
let adminPin = "";

function login() {
  adminPin = document.getElementById("pin").value;
  document.getElementById("panel").style.display = "block";
  loadCustomers();
}

function addCustomer() {
  fetch(API + "/api/admin/add-customer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-pin": adminPin
    },
    body: JSON.stringify({
      name: name.value,
      mobile: mobile.value
    })
  })
  .then(r => r.json())
  .then(() => {
    alert("Customer added");
    loadCustomers();
  });
}

function loadCustomers() {
  fetch(API + "/api/admin/customers", {
    headers: { "x-admin-pin": adminPin }
  })
  .then(r => r.json())
  .then(data => {
    list.innerHTML = data.map(c =>
      `<li>${c.name} – ${c.mobile}</li>`
    ).join("");
  });
}
