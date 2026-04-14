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
// about send code to gmail
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
  try{
      const { email, otp } = req.body;
      console.log(email,otp,"opt and email")
      console.log(typeof otp)
      console.log(typeof otpStore[email])
      if (otpStore[email] === Number(otp)) {
        res.json({success:true, message: "Verified ✅" });
      } else {
        res.status(400).json({success:false, message: "invalid number" });
      }
  }catch{
     res.status(400).json({success:true, message: "invalid number" });
  }

});

app.listen(3000, () => console.log("Server running"));