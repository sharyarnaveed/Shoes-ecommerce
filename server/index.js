const express = require("express");
const connection=require("./config/db_conn");
require("dotenv").config();
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path =require('path')
// const multer=require(multer)

app.use(cors());
app.use(bodyParser.json());

app.post("/sendmail"  ,async (req, res) => {
  const { email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.SENDER_ADDRESS, // sender address
    to: "", // list of receivers
    replyTo: email, // reply-to address
    subject: subject, // Subject line
    text: message, // plain text body
  });

  console.log("Message sent: %s", info);
  res.send({ success: true, message: "Email sent successfully!", info });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, 'image-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post('/save_data', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const filePath = req.file.path;
    console.log(filePath);

    // Uncomment and implement database insertion logic if needed
    const { name, description, price } = req.body;

    console.log(name);
    const sql = `INSERT INTO \`theproducts\`(\`product_name\`, \`product_description\`, \`price\`,\`product_image\`) VALUES (?, ?, ?,?)`;
    const [result, fields] = await connection.execute(sql, [name, description, price,filePath]);
    console.log(result);
    res.json({ success: true, message: 'Product saved successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to save product' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
