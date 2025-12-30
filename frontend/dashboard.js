const API = "https://sreelakshmi-backend.onrender.com";

// customerId is saved after login
const customerId = localStorage.getItem("customerId");

if (!customerId) {
  document.body.innerHTML = "<h3>Please login again</h3>";
} else {
  fetch(`${API}/api/customer/bills/${customerId}`)
    .then(res => res.json())
    .then(data => {
      const ul = document.getElementById("bills");

      if (data.length === 0) {
        ul.innerHTML = "<li>No bills found</li>";
        return;
      }

      ul.innerHTML = data.map(b =>
        `<li>
          Bill ID: ${b.id} |
          Total: ${b.total_amount} |
          Balance: ${b.balance} |
          Status: ${b.status}
        </li>`
      ).join("");
    })
    .catch(err => {
      document.body.innerHTML = "<h3>Error loading bills</h3>";
      console.error(err);
    });
}
