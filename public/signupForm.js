//selecting elements
const agreedCheckB = document.querySelector('#agreedCheckBox')
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
        const res = await fetch("http://localhost:3000/email",{
            method :"POST",
            headers :{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(emailverification),
            credentials: "include"
        })
        const data = await res.json()
        console.log(data,"data")
        window.location.href = "./emailCode.html"
    }
    // const res  = await fetch("https://69caf052ba5984c44bf3fc7c.mockapi.io/loginapi/v1/loginform",{
    //     method:"POST",
    //     headers:{
    //         "Content-Type" : "application/json"
    //     },
    //     body:JSON.stringify(Object.fromEntries(formData))
    // })
})


                                                                                                                                                                                                                                                                                                                                                                                                      