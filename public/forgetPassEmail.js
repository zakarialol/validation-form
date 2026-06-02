const forgetpassPageSignUpBtn = document.querySelector('[data-btn="ForgPssSignUpbtn"]')
const ForgetPassFormSendBtn = document.getElementById('ForgetPassForm')
const emailTorestPass = document.querySelector('[data-input="emailPassReset"]')
const sendButton = document.getElementById('sendButton')
const forgotPasswordEmailConfirm = document.getElementById('forgotPasswordEmailConfirm')
const emailConfirmMsg = document.getElementById('emailConfirmMsg')
const arrowBack = document.getElementById('arrowBack')
// logic
import { sendOtpFunc,svg,checkIfEmailexistInDataBaseFunc } from "./state.js"
forgetpassPageSignUpBtn.addEventListener('click',()=>{
    window.location.href = "./signupForm.html"
})

ForgetPassFormSendBtn.addEventListener("submit",async(event)=>{
    event.preventDefault()
    const email = emailTorestPass.value.trim()
    sendButton.innerHTML = `sending ... ${svg}`
    sendButton.disabled = true
    const result = await checkIfEmailexistInDataBaseFunc(email)
    if(result){
        await sendOptForRestPassFunc(email)
        sendButton.textContent = `send`
        sendButton.disabled = true
    }else{
       const heightt =  emailConfirmMsg.scrollHeight
       forgotPasswordEmailConfirm.style.height = heightt + "px"
        sendButton.innerHTML = `send`
        sendButton.disabled = true
    }
})

// send opt to resset the password
async function sendOptForRestPassFunc(email){
    await storeTheEmailIntheSessionFunc(email)
    await sendOtpFunc(email)
    window.location.replace('./forgotPassVerifi.html')
}
// storing the email in the seassion first
async function storeTheEmailIntheSessionFunc(email){
    try{
        sendButton.disabled = true
        sendButton.innerHTML = `sending ... ${svg}`
        const response = await fetch("/email",{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({email})
        })
        const result = await response.json()
    }catch(err){
    }finally{
        sendButton.disabled = false
        sendButton.textContent = "send"

    }
}
arrowBack.addEventListener('click',()=>{
    history.back()
})
// sending the otp
