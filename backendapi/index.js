import "dotenv/config";
import express, { json } from "express";
import session, { Session } from "express-session";
import cors from "cors";
import multer from "multer";
//
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
//
import path from "path";
import { fileURLToPath } from "url";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//
const app = express();
const upload = multer()
const PORT = process.env.PORT || 3000;
app.use(express.static("public"))
app.use(express.json());
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});
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
app.post("/email",upload.none(),(req,res)=>{
  try{
  const {firstName,lastName,password,confirmPassword,gender,skill,email,phone,address,postalCode} = req.body;
  req.session.user = {firstName,lastName,password,confirmPassword,gender,skill,email,phone,address,postalCode,date:new Date().toLocaleString()}
  res.json({success: true})

  }catch(err){
    res.status(500).json({success:false})
  }
})
// getting the code from the user session
app.get("/getemailCodeSendOn",(req,res)=>{
  try{
    res.json({email:req.session.user?.email|| null})
  }catch(err){
        res.status(500).json({success:false})
  }
})

function genireateOTPFunc(){
  return Math.floor(1000 + Math.random() * 9000)
}
//
async function sentOTPFunc(email){
  const otp = genireateOTPFunc()
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Your OTP Code",
      html: `<h2>Your OTP Code</h2><p><b>${otp}</b></p>`
    });

  return otp
}
let otpStore = {}
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  const otp = await sentOTPFunc(email);
  otpStore[email] = otp;
  res.json({ message: "OTP sent"});
});
//verify the email 
app.post("/verify-otp", async(req, res) => {
  try{
      const { email, otp } = req.body;
      if (otpStore[email] === Number(otp)) {
        res.json({success:true, message: "Verified" });
      } else {
        res.status(400).json({success:false, message: "invalid number" });
      }
  }catch{
     res.status(400).json({success:false, message: "invalid number" });
  }

});
//
app.post("/storeUserToMock",async(req,res)=>{
            try{
            const response = await fetch("https://69caf052ba5984c44bf3fc7c.mockapi.io/loginapi/v1/loginform",{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify(req.session.user)
            })
            res.json({succes : true})
            
          }catch(err){
            res.status(400).json({error:"err",stored:"none"})
          }
})
//store the user found
app.post("/storeValidUser",async(req,res)=>{
  const userFound = req.body
  try{
    if(userFound){
      req.session.validUser = userFound || null
    }
    res.json({succes : "true"})
  }catch(err){
    res.status(400).json({
      success:false,message:"user not regestered in the seassion"
    })
  }
})
app.get("/userInfo",(req,res)=>{
  try{
    res.json({succes:true ,userInfo:req.session.validUser||null})
  }catch(err){
    res.status(400).json({message:"info not working"})
  }
})
// async function storeinforToMockApi(req){

// }
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});