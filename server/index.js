const express = require('express')
require('dotenv').config();
const app = express()
const port = 3000
const cors=require('cors');
const bodyParser=require('body-parser')
const nodemailer = require("nodemailer");
app.use(cors());
app.use(bodyParser.json());


app.post('/sendmail', async(req, res) => {
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
    to: '', // list of receivers
    replyTo: email, // reply-to address
    subject: subject, // Subject line
    text: message // plain text body
  });

  console.log("Message sent: %s", info);
  res.send({success: true, message: 'Email sent successfully!', info});
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>






})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})