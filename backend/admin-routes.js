const express = require("express");
const router = express.Router();
const db = require("./db");

// Simple admin auth
router.use((req, res, next) => {
  const pin = req.headers["x-admin-pin"];
  if (pin !== process.env.ADMIN_PIN) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

// Add customer
router.post("/add-customer", (req, res) => {
  const { name, mobile } = req.body;

  db.query(
    "INSERT INTO customers (name, mobile) VALUES ($1, $2)",
    [name, mobile]
  )
    .then(() => res.json({ success: true }))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Customer already exists" });
    });
});

// List customers
router.get("/customers", (req, res) => {
  db.query("SELECT id, name, mobile FROM customers ORDER BY id DESC")
    .then(r => res.json(r.rows))
    .catch(err => res.status(500).json({ error: "DB error" }));
});

module.exports = router;
