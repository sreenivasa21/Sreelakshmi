const express = require("express");
const router = express.Router();
const db = require("./db");

/**
 * =========================
 * ADMIN LOGIN
 * =========================
 */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(
      "SELECT id, role FROM admins WHERE username=$1 AND password=$2",
      [username, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid login" });
    }

    res.json({
      success: true,
      admin: result.rows[0]
    });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: "DB error" });
  }
});

/**
 * =========================
 * GET ALL CUSTOMERS
 * =========================
 */
router.get("/customers", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT id, name, mobile FROM customers ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Get customers error:", err);
    res.status(500).json({ error: "DB error" });
  }
});

/**
 * =========================
 * ADD CUSTOMER
 * =========================
 */
router.post("/customers", async (req, res) => {
  const { name, mobile } = req.body;

  try {
    await db.query(
      "INSERT INTO customers (name, mobile) VALUES ($1, $2)",
      [name, mobile]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Add customer error:", err);
    res.status(500).json({ error: "DB error" });
  }
});

/**
 * =========================
 * DELETE CUSTOMER
 * =========================
 */
router.delete("/customers/:id", async (req, res) => {
  try {
    await db.query(
      "DELETE FROM customers WHERE id=$1",
      [req.params.id]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Delete customer error:", err);
    res.status(500).json({ error: "DB error" });
  }
});

module.exports = router;
