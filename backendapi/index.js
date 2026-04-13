import "dotenv/config";
import express from "express";
import session from "express-session";
import cors from "cors";
import nodemailer from "nodemailer";
const app = express();
app.use(express.static("public"))
app.use(express.json());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "lax",
    secure: false 
  }
}));
app.use(cors({
  origin: "http://127.0.0.1:5500",
  credentials: true
}))

// this about storing the email
app.post("/email",(req,res)=>{
  try{
  const {email} = req.body;
  req.session.user = {email}
  res.json({success: true})

  }catch(err){
    res.status(500).json({success:false})
    console.log("error",err)
  }
})
// getting the code from the user session
app.get("/emailCode",(req,res)=>{
  try{
    res.json({email:req.session.user?.email|| null})
  }catch(err){
    console.log("error",err)
  }
})
console.log(process.env.easyMailToken,"procces.env")
// retrive the email code 
app.post("/retriveEmailCode",async(req,res)=>{

  try{
    const {email = "zakariaeaitbibote@gmail.com"} = req.body
    const ress = await fetch(`https://easyemailapi.com/api/verify/${encodeURIComponent(email)}`,{
      headers : {
        Authorization:`Bearer ${process.env.easyMailToken}` 
      }
    })
    console.log(ress.status, "ress.status **##**")
    if(!ress.ok) throw new Error("something went wrong");
    const data = await ress.json()
    console.log(data)
    res.json({
      suscces : true ,
      data : data
    })
  }catch(err){
    console.log("error",err)
    res.status(500).json({ success: false, error: err.message });
  }
})
// about send code to gmail
console.log("gmailPass",process.env.gmailPass)
const transporder = nodemailer.createTransport({
  service:"gmail",
  auth:{
    user: "boxbox1998me@gmail.com",
    pass: `${process.env.gmailPass}`
  }
})
// genireate the code function 
function genireateOTPFunc(){
  return Math.floor(1000 + Math.random() * 9000)
}
//
async function sentOTPFunc(email){
  const otp = genireateOTPFunc()
    const mailOptions = {
    from: "boxbox1998me@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`
  };
  await transporder.sendMail(mailOptions)
  return otp
}
let otpStore = {}
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = await sentOTPFunc(email);
  otpStore[email] = otp;
  res.json({ message: "OTP sent" });
});
//verify the email 
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  console.log(email,otp,"opt and email")
  if (otpStore[email] == otp) {
    res.json({ message: "Verified ✅" });
  } else {
    res.status(400).json({ message: "Invalid ❌" });
  }
});

app.listen(3000, () => console.log("Server running"));