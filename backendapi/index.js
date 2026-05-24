import "dotenv/config";
import express, { json } from "express";
import session, { Session } from "express-session";
import cors from "cors";
import nodemailer from "nodemailer";
import multer from "multer";
const app = express();
const upload = multer()
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
app.post("/email",upload.none(),(req,res)=>{
  try{
  console.log(req.body,"************body send from the front end")
  const {firstName,lastName,password,confirmPassword,gender,skill,email,phone,address,postalCode} = req.body;
  req.session.user = {firstName,lastName,password,confirmPassword,gender,skill,email,phone,address,postalCode,date:new Date().toLocaleString()}
  res.json({success: true})

  }catch(err){
    res.status(500).json({success:false})
    console.log("error",err)
  }
})
// getting the code from the user session
app.get("/getemailCodeSendOn",(req,res)=>{
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
    subject: "OTP Code",
    text: `Your OTP is: ${otp}`
  };
  await transporder.sendMail(mailOptions)
  return otp
}
let otpStore = {}
app.post("/send-otp", async (req, res) => {
  console.log('sending ...')
  const { email } = req.body;
  console.log(req.body.email)
  const otp = await sentOTPFunc(email);
  otpStore[email] = otp;
  res.json({ message: "OTP sent"});
});
//verify the email 
app.post("/verify-otp", async(req, res) => {
  try{
      const { email, otp } = req.body;
      console.log(email,otp,"opt and email")
      if (otpStore[email] === Number(otp)) {
          console.log(req.session.user,"*-* this the user")
          try{
            const response = await fetch("https://69caf052ba5984c44bf3fc7c.mockapi.io/loginapi/v1/loginform",{
              method:"POST",
              headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify(req.session.user)
            })
            
          }catch(err){
            res.status(400).json({error:"err",stored:"none"})
          }
        // await storeinforToMockApi()
        res.json({success:true, message: "Verified" });
      } else {
        // console.log("inside else right")
        res.status(400).json({success:false, message: "invalid number" });
      }
  }catch{
     res.status(400).json({success:false, message: "invalid number" });
  }

});
//store the user found
app.post("/storeValidUser",async(req,res)=>{
  console.log(req.body,"***###3** body **")
  const userFound = req.body
  try{
    if(userFound){
      console.log("enter")
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
  console.log('hello world from user Info')
  try{
    res.json({succes:true ,userInfo:req.session.validUser||null})
  }catch(err){
    res.status(400).json({message:"info not working"})
  }
})
// async function storeinforToMockApi(req){

// }
app.listen(3000, () => console.log("Server running"));