const emailHolder = document.querySelector('[data-email="email"]')
const confirmOTPBtn = document.querySelector('[data-btn="confirmOTP"]')
const inputsVerificationOtp = document.querySelectorAll('[data-div="otp-inputs"] input')
const ErroOtpMsg = document.querySelector('[data-otp="otp-holder"]')
const resendOTP = document.querySelector('[data-btn="resendOTP"]')
const arrowBack = document.getElementById('arrowBack')
//todo: importing stuff
import {verificationInputFunc ,confirmOptFunc,getEmailFunc,optFunc} from "./state.js"
getEmailFunc(emailHolder)
//
confirmOTPBtn.addEventListener('click',async()=>{
    let email = emailHolder.textContent
    const data = await confirmOptFunc({inputs:inputsVerificationOtp,erroOtpMsg:ErroOtpMsg,email:email})
    if(data.success === true){
        await fetch("http://localhost:3000/storeUserToMock",{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            }
        })
         window.location.replace('./emailVerSucces.html')
    }
})
resendOTP.addEventListener('click',()=>{
    optFunc(emailHolder.textContent)
})
// working the inputs 
verificationInputFunc(inputsVerificationOtp)
arrowBack.addEventListener('click',()=>{
    history.back()
})
