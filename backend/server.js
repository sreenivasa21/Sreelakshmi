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

app.get("/api/customer/bills/:id", (req, res) => {
  db.query(
    "SELECT id, total_amount, balance, status FROM bills WHERE customer_id=?",
    [req.params.id],
    (e, r) => res.json(r)
  );
});

app.listen(process.env.PORT || 5000);
