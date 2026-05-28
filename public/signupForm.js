//selecting elements
const agreedCheckB = document.querySelector('#agreedCheckBox')
const signUpBtn = document.querySelector("[data-btn='sign-up']")
//raio button 
//todo first Name 
//importing files and functions 
import "./ui.js"
import "./state.js"
import {agreedFalseFunc, agreedTrueFunc} from "./ui.js"
import {form,emailverification,optFunc, svg} from "./state.js"
import {validFormInputsFunc} from "./formValidation.js"
//
//
agreedCheckB.addEventListener("change",(e)=>{
    if(e.target.checked){
        agreedTrueFunc()
    }
    if(!e.target.checked){   
        agreedFalseFunc()
    }
})
//adding event sign up button 
form.addEventListener('submit',async(e)=>{
    e.preventDefault()
    const formdata =new FormData(form)
    const valid = validFormInputsFunc()
    if(valid){
        try{
            signUpBtn.disabled = true
            signUpBtn.innerHTML = `signing ${svg}`
            const res = await fetch("http://localhost:3000/email",{
                method :"POST",
                body: formdata,
                // headers :{
                //     "Content-Type" : "application/json"
                // },
                // body: JSON.stringify(emailverification),
                credentials: "include"
            })
            console.log(await res.json())
            await optFunc(emailverification.email)
            window.location.href = "./emailCode.html"   
        }catch(err){
            console.log("error",err)
        }finally{
            signUpBtn.disabled = false
            signUpBtn.textContent = "sign up"
        }
    }
})


                                                                                                                                                                                                                                                                                                                                                                                                      