const forgetpassPageSignUpBtn = document.querySelector('[data-btn="ForgPssSignUpbtn"]')
const ForgetPassFormSendBtn = document.getElementById('ForgetPassForm')
const emailTorestPass = document.querySelector('[data-input="emailPassReset"]')
const sendButton = document.getElementById('sendButton')
// logic
import { sendOtpFunc,svg } from "./state.js"
console.log(forgetpassPageSignUpBtn)
forgetpassPageSignUpBtn.addEventListener('click',()=>{
    window.location.href = "./signupForm.html"
})

ForgetPassFormSendBtn.addEventListener("submit",(event)=>{
    event.preventDefault()
    const email = emailTorestPass.value.trim()
    sendOptForRestPassFunc(email)
    console.log('you just presst send')
})

// send opt to resset the password
async function sendOptForRestPassFunc(email){
    await storeTheEmailIntheSessionFunc(email)
    await sendOtpFunc(email)
    window.location.href = "./forgotPassVerifi.html"
}
// storing the email in the seassion first
async function storeTheEmailIntheSessionFunc(email){
    try{
        sendButton.disabled = true
        sendButton.innerHTML = `sending ... ${svg}`
        const response = await fetch("http://localhost:3000/email",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({email})
        })
        const result = await response.json()
        console.log('result', result)
    }catch(err){
        console.log(err)
    }finally{
        sendButton.disabled = false
        sendButton.textContent = "send"

    }
}
// sending the otp
