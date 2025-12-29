const API = "https://sreelakshmi-backend.onrender.com";

let customerId;

function sendOTP() {
  fetch(API + "/api/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile: mobile.value })
  });
}

function verifyOTP() {
  fetch(API + "/api/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mobile: mobile.value, otp: otp.value })
  })
  .then(r => r.json())
  .then(d => {
    customerId = d.customerId;
    window.location = "dashboard.html";
    loadBills();
  });
}

function loadBills() {
  fetch(API + "/api/customer/bills/" + customerId)
    .then(r => r.json())
    .then(b =>
      bills.innerHTML = b.map(x =>
        `<li>Bill #${x.id} | ₹${x.total_amount} | Balance ₹${x.balance}</li>`
      ).join("")
    );
}
