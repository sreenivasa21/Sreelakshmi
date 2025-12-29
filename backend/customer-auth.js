const db = require("./db");
const { sendWhatsApp } = require("./whatsapp");

// SEND OTP
exports.sendOTP = (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  const mobile = req.body.mobile;

  db.query(
    "UPDATE customers SET otp=$1, otp_expiry=NOW() + INTERVAL '5 minutes' WHERE mobile=$2",
    [otp, mobile]
  )
    .then(async () => {
      await sendWhatsApp(mobile, `OTP: ${otp}`);
      res.json({ success: true });
    })
    .catch(err => {
      console.error("Send OTP error:", err);
      res.status(500).json({ success: false });
    });
};

// VERIFY OTP
exports.verifyOTP = (req, res) => {
  const { mobile, otp } = req.body;

  db.query(
    "SELECT id FROM customers WHERE mobile=$1 AND otp=$2 AND otp_expiry > NOW()",
    [mobile, otp]
  )
    .then(result => {
      if (result.rows.length === 0) {
        return res.status(401).json({ success: false });
      }
      res.json({ success: true, customerId: result.rows[0].id });
    })
    .catch(err => {
      console.error("Verify OTP error:", err);
      res.status(500).json({ success: false });
    });
};
