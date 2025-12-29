const db = require("./db");
const { sendWhatsApp } = require("./whatsapp");

exports.sendOTP = (req, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  db.query(
    "UPDATE customers SET otp=?, otp_expiry=DATE_ADD(NOW(), INTERVAL 5 MINUTE) WHERE mobile=?",
    [otp, req.body.mobile],
    async () => {
      await sendWhatsApp(req.body.mobile, `OTP: ${otp}`);
      res.json({ success: true });
    }
  );
};

exports.verifyOTP = (req, res) => {
  db.query(
    "SELECT id FROM customers WHERE mobile=? AND otp=? AND otp_expiry>NOW()",
    [req.body.mobile, req.body.otp],
    (e, r) => {
      if (!r.length) return res.status(401).json({ success: false });
      res.json({ success: true, customerId: r[0].id });
    }
  );
};
