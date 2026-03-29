//selecting elements
const agreedCheckB = document.querySelector('#agreedCheckBox')
//raio button 
const skill = document.querySelectorAll('input[name="skill"]')
console.log(skill)
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

signUpBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    console.log('hello world ');
    console.log(skill)
    const check = [...skill].some((itm)=>{
        return itm.checked
    })
    
})
// let sting = "D"
// let regex = /\bd\b/i
// console.log(regex.test(sting))
                                                                                                                                                                                                                                                                                                                                                                                                      