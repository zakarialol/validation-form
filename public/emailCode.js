const emailHolder = document.querySelector('[data-email="email"]')
const confirmOTPBtn = document.querySelector('[data-btn="confirmOTP"]')
const inputsVerificationOtp = document.querySelectorAll('[data-div="otp-inputs"] input')
// console.log(inputsVerificationOtp)
const ErroOtpMsg = document.querySelector('[data-otp="otp-holder"]')
//todo: importing stuff
import {verificationInputFunc ,confirmOptFunc,getEmailFunc} from "./state.js"
getEmailFunc(emailHolder)
//
confirmOTPBtn.addEventListener('click',async()=>{
    let email = emailHolder.textContent
    console.log(email,"email")
    await confirmOptFunc({inputs:inputsVerificationOtp,erroOtpMsg:ErroOtpMsg,page:"./emailVerSucces.html",email:email})
})
// working the inputs 
verificationInputFunc(inputsVerificationOtp)
