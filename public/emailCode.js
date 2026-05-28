const emailHolder = document.querySelector('[data-email="email"]')
const confirmOTPBtn = document.querySelector('[data-btn="confirmOTP"]')
const inputsVerificationOtp = document.querySelectorAll('[data-div="otp-inputs"] input')
// console.log(inputsVerificationOtp)
const ErroOtpMsg = document.querySelector('[data-otp="otp-holder"]')
const resendOTP = document.querySelector('[data-btn="resendOTP"]')
console.log(resendOTP)
//todo: importing stuff
import {verificationInputFunc ,confirmOptFunc,getEmailFunc,optFunc} from "./state.js"
getEmailFunc(emailHolder)
//
confirmOTPBtn.addEventListener('click',async()=>{
    let email = emailHolder.textContent
    console.log(email,"email")
    const data = await confirmOptFunc({inputs:inputsVerificationOtp,erroOtpMsg:ErroOtpMsg,email:email})
    console.log(data)
    if(data.success === true){
        console.log("hello world from the confirm otp ***#**")
        await fetch("http://localhost:3000/storeUserToMock",{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            }
        })
        console.log("changing the page ...")
         window.location.href ="./emailVerSucces.html"
    }
})
resendOTP.addEventListener('click',()=>{
    console.log('you just pressed the resend button')
    optFunc(emailHolder.textContent)
})
// working the inputs 
verificationInputFunc(inputsVerificationOtp)
