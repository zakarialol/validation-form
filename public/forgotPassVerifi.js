const confirmOTP = document.querySelector('[data-btn="confirmOTP"]')
const emailHolder = document.querySelector('[data-email="email"]')
const otpInputs = document.querySelectorAll('[data-div="otp-inputs"] input')
const erroMsgHolder = document.querySelector('[data-otp="otp-holder"]')
const resendOTP = document.querySelector('[data-btn="resendOTP"]')
//
import { verificationInputFunc,confirmOptFunc,sendOtpFunc,getEmailFunc} from "./state.js"
//
getEmailFunc(emailHolder)
async function GetEmailFromSessionFunc(){
    const response = await fetch("http://localhost:3000/getemailCodeSendOn")
    const result = await response.json()
    emailHolder.textContent = result.email
}
GetEmailFromSessionFunc()
// adding evnetListener on the inputs 
verificationInputFunc(otpInputs)
// confirm otp button
confirmOTP.addEventListener('click',async ()=>{
    const data = await confirmOptFunc({inputs:otpInputs,erroOtpMsg:erroMsgHolder,email:emailHolder.textContent})
    if(data.success){
        window.location.href = "./ForgSetNewPass.html"
    }
})
// resend the code 
resendOTP.addEventListener('click',async ()=>{
    const email = emailHolder.textContent
    sendOtpFunc(email)
})
