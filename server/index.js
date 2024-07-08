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
const bcrypt=require('bcryptjs');
const { log } = require("console");
const router = express.Router();


app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


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


app.post('/login-admin',async(req,res)=>
{
  const {username,password}=req.body;
const salt= await bcrypt.genSalt(10);
const hash=await bcrypt.hash(password,salt);
const sql = `SELECT * FROM \`admin\` WHERE \`username\` = ?`;
const [result,fields]=await connection.execute(sql,[username]);
if(result.length>0){
  const isMatch=await bcrypt.compare(password,result[0].password);
  if(isMatch){
    res.json({success:true,message:'Login successful',admin:result[0]});
    // router.push('/the-admin-panel');
    }
    else{
      res.json({success:false,message:'Invalid username or password'});
      }
} 


})

app.get('/the-admin-panel',async(req,res)=>
{
  res.send({success:false});
})

app.get('/productdata',async(req,res)=>
{
  const sql = `SELECT * FROM \`theproducts\` `;
const [result,fields]= await connection.execute(sql);
// console.log(result);
res.json(result);
})


const getitemsdetail=async(id)=>
{
  const sql="SELECT * FROM \`THEPRODUCTS\` WHERE \`product_id\`=?";
  const [result,fields]=await connection.execute(sql,[id]);
  // console.log(result);
  return result;

}

app.get('/productdetail/:id',async(req,res)=>
{
  const id =req.params.id;
  const itemdatils= await getitemsdetail(id);
console.log(itemdatils);
res.json(itemdatils);

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
