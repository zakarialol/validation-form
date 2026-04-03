//selecting elements
const agreedCheckB = document.querySelector('#agreedCheckBox')
//raio button 
const form = document.getElementById('registerForm')
//todo first Name 
//importing files and functions 
import "./ui.js"
import "./state.js"
import {agreedFalseFunc, agreedTrueFunc} from "./ui.js"
import {  ObjectForm } from "./state.js"
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
    // const element = ArrayFormValues.find(itm =>{
    //    return itm.passed === false
    // })
    const formData = new FormData(form)
    console.log(ObjectForm)
    const res  = await fetch("https://69caf052ba5984c44bf3fc7c.mockapi.io/loginapi/v1/loginform",{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(Object.fromEntries(formData))
    })
})

                                                                                                                                                                                                                                                                                                                                                                                                      