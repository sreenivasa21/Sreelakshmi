require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");
const auth = require("./customer-auth");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/send-otp", auth.sendOTP);
app.post("/api/verify-otp", auth.verifyOTP);

// ✅ FIXED QUERY (MySQL ? ➜ Postgres $1)
app.get("/api/customer/bills/:id", (req, res) => {
  db.query(
    "SELECT id, total_amount, balance, status FROM bills WHERE customer_id=$1",
    [req.params.id]
  )
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error("DB error:", err);
      res.status(500).json({ error: "Database error" });
    });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server running on port", process.env.PORT || 5000);
});
