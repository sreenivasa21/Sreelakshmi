const API = "https://sreelakshmi-backend.onrender.com";
let adminPin = "";

function login() {
  adminPin = document.getElementById("pin").value;

  if (!adminPin) {
    alert("Enter admin PIN");
    return;
  }

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
      name: document.getElementById("name").value,
      mobile: document.getElementById("mobile").value
    })
  })
    .then(res => res.json())
    .then(() => {
      alert("Customer added");
      loadCustomers(); // ✅ reload list
    })
    .catch(err => {
      console.error(err);
      alert("Error adding customer");
    });
}

function loadCustomers() {
  fetch(API + "/api/admin/customers", {
    headers: {
      "x-admin-pin": adminPin
    }
  })
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("list");
      list.innerHTML = "";

      if (!data.length) {
        list.innerHTML = "<li>No customers found</li>";
        return;
      }

      data.forEach(c => {
        const li = document.createElement("li");
        li.textContent = `${c.name} - ${c.mobile}`;
        list.appendChild(li);
      });
    })
    .catch(err => {
      console.error(err);
      alert("Failed to load customers");
    });
}
