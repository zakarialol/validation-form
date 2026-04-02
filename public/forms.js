//selecting elements
const agreedCheckB = document.querySelector('#agreedCheckBox')
//raio button 
const skill = document.querySelectorAll('input[name="skill"]')
const form = document.getElementById('registerForm')
//todo first Name 
//importing files and functions 
import "./ui.js"
import "./state.js"
import {agreedFalseFunc, agreedTrueFunc} from "./ui.js"
import { signUpBtn } from "./state.js"
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
    const formData = new FormData(form)
    const formObject = Object.fromEntries(formData)
    console.log(formObject)
    // const userInfo = 
    const res  = await fetch("https://69caf052ba5984c44bf3fc7c.mockapi.io/loginapi/v1/loginform",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(formObject)
    })
    // console.log(await res.json())
    // form.reset()
    // const data = await res.json()
    // console.log(data)
    // const check = [...skill].some((itm)=>{
    //     return itm.checked
    // })
    // window.location.href = "loginSucces.html"
})

                                                                                                                                                                                                                                                                                                                                                                                                      