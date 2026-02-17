import express from "express"   
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const app=express()


const port =1000

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("working")
})

app.post("/send", async(req, res) => {
  
  const { name, email, message } = req.body;
  
   const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // 
      pass: process.env.GMAIL_APP_PASSWORD 
    },
  });
   const mailOptions = {
    from: email, // client email
    to: process.env.GMAIL_USER,
    subject: `New message from ${name}`,
    text: `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    console.error("Mail error:", error);
    res.json({ success: false });
  }
});





app.listen(port,()=>{
    console.log(`server run on http://localhost:${port}`)
})

