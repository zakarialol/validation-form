//selecting elements
const agreedCheckB = document.querySelector('#agreedCheckBox')
const signUpBtn = document.querySelector("[data-btn='sign-up']")
//raio button 
//todo first Name 
//importing files and functions 
import "./ui.js"
import "./state.js"
import {agreedFalseFunc, agreedTrueFunc} from "./ui.js"
import { form ,emailverification} from "./state.js"
import {validFormInputsFunc} from "./formValidation.js"
//
agreedCheckB.addEventListener("change",(e)=>{
    if(e.target.checked){
        agreedTrueFunc()
    }
    if(!e.target.checked){        agreedFalseFunc()
    }
})
//adding event sign up button 
form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    const valid = validFormInputsFunc()
    if(valid){
        try{
            signUpBtn.disabled = true
            const res = await fetch("http://localhost:3000/email",{
                method :"POST",
                headers :{
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(emailverification),
                credentials: "include"
            })
            await optFunc(emailverification.email)
            window.location.href = "./emailCode.html"   
        }catch(err){
            console.log("error",err)
        }finally{
            signUpBtn.disabled = false
        }
    }
})
//
// async function getEmailFunc(){
//     try{
//         const res = await fetch("http://localhost:3000/emailCode",{
//             credentials: "include"
//         })
//         const data = await res.json()
//         emailHolder.textContent = data.email
//         sendEmailCodeFunc(data.email)
//         optFunc(data.email)
//         console.log(data)
//         return data.email
//     }catch(err){
//         console.log("error",err)
//     }
// }
// getEmailFunc()
async function optFunc(email){
    const response = await fetch("http://localhost:3000/send-otp",{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email})
    })
    const data = await response.json()
    console.log(data, "data from the otp send")
}
//
confirmOTPBtn.addEventListener('click',async()=>{
    console.log("you just clicked confirm")
    const email =await getEmailFunc()
    console.log(email,"email")
    const otp = otptest.value.trim() 
    console.log(otp , "otpv")
    const response = await fetch("http://localhost:3000/verify-otp",{
        method:"POST",
        headers :{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({email,otp})
    })
    const data = await response.json()
    console.log(data)
    // 
        // const res  = await fetch("https://69caf052ba5984c44bf3fc7c.mockapi.io/loginapi/v1/loginform",{
    //     method:"POST",
    //     headers:{
    //         "Content-Type" : "application/json"
    //     },
    //     body:JSON.stringify(Object.fromEntries(formData))
    // })
})

                                                                                                                                                                                                                                                                                                                                                                                                      