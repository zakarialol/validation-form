//select elements 
const firstNameInput = document.getElementById("firstName")
const lastNameInput = document.getElementById("last-name")
const fTrueSvg = document.querySelector('[data-valid="firstName"] #fNameTruesvg')
const fFalseSvg = document.querySelector('[data-valid="firstName"] #fNameFalsesvg')
const firstNameSvgsHolder = document.querySelector('[data-valid="firstName"]')
const lTrueSvg = document.querySelector('[data-valid="lastName"] #LNameTruesvg')
const lFalseSvg = document.querySelector('[data-valid="lastName"] #LNameFalsesvg')
const lastNameSvgsHolder = document.querySelector('[data-valid="lastName"]')
// passord selectors 
const passwordInput =  document.getElementById("passwordInput")
const PasswordConditionUL = document.getElementById("PasswordConditionUL")
const passwordSvgsHolder = document.querySelector("[data-valid='password']")
const upperCaseLetterForPassword = document.getElementById("passowrdContUppCaL")
const numberPasswordForPassword = document.getElementById("psswordContNbrL")
const scpecialCaraterForPassword = document.getElementById("passwordContSpclCaratrL")
const pssFalseSvg = document.getElementById('passwordFalsesvg')
const pssTrueeSvg = document.getElementById('passwordTruesvg')
//confirm Password 
const confirmPass = document.getElementById('confirm-pass')
const confirmPssTrueSvg = document.getElementById('confirmPasswordTruesvg')
const confirmPssFalseSvg = document.getElementById('confirmPasswordFalsesvg')
const confirmPssSvgsHolder = document.querySelector('[data-valid="confirmPassword"]')
const confirmPssError = document.querySelector('[data-valid="confirmPssError"]')
// import elements
import { signUpBtn } from "./state.js";
export {agreedFalseFunc,agreedTrueFunc,}
// function to agreed checkbox
function agreedTrueFunc(){
    toggleFunc(true)
    signUpBtn.disabled = false
}
// functions about disactive agreed checkbox
function agreedFalseFunc(){
    toggleFunc(false)
    signUpBtn.disabled = true
}
//toggle the visibility function
function toggleFunc(isvisible){
    signUpBtn.classList.toggle("opacity-40",!isvisible)
    signUpBtn.classList.toggle("opacity-100",isvisible)
}
// validtion of the first name 
function NameValidationFunc(El,regex,mainHolder,svgFalse,svgTrue){
        let NameV = El.value.trim()
        let regexTest = regex
        if(regexTest.test(NameV)){
            ToggleSvgsFunc(svgTrue,svgFalse,mainHolder,true)
        }else if(NameV.trim()==="" || !regexTest.test(NameV)){
            ToggleSvgsFunc(svgTrue,svgFalse,mainHolder,false)
        }
    // })
}
firstNameInput.addEventListener("blur",()=>{
    NameValidationFunc(firstNameInput,/^[a-zA-Z]{2,}$/,firstNameSvgsHolder,fFalseSvg,fTrueSvg)
})
// validation of the svgs 
function ToggleSvgsFunc(svgFalseEl,svgTrueEl,mainHolder,condition){
            mainHolder.classList.remove('hidden')
            svgFalseEl.classList.toggle('hidden',!condition)
            svgTrueEl.classList.toggle('hidden',condition)
}
// validtion of last name 
lastNameInput.addEventListener("blur",()=>{
    NameValidationFunc(lastNameInput,/^[a-zA-Z]{2,}$/,lastNameSvgsHolder,lFalseSvg,lTrueSvg)
})
// about passord
passwordInput.addEventListener('input',()=>{
    let passwordValue = passwordInput.value.trim()
    verfyPassword(passwordValue)
})
passwordInput.addEventListener('focus',()=>{
    PasswordConditionUL.classList.remove('hidden')
})
// function to verfy password input 
let passwordValidationObj = {}
function verfyPassword(passwordInputValue){
    if(/(?=.*[A-Z]).{6,}/.test(passwordInputValue)){
        toggleErrorPasswordParagraphsFunc(upperCaseLetterForPassword,true)
        passwordValidationObj.Passowrd1condition = true
    }else{
        toggleErrorPasswordParagraphsFunc(upperCaseLetterForPassword,false)
        passwordValidationObj.Passowrd1condition = ""
    }

    if(/\d+/.test(passwordInputValue)){
        toggleErrorPasswordParagraphsFunc(numberPasswordForPassword,true)
        passwordValidationObj.Passowrd2condition = true
    }else{
        toggleErrorPasswordParagraphsFunc(numberPasswordForPassword,false)
        passwordValidationObj.Passowrd2condition = ""
    }

    if(/[^a-zA-Z0-9]/.test(passwordInputValue)){
        toggleErrorPasswordParagraphsFunc(scpecialCaraterForPassword,true)
        passwordValidationObj.Passowrd3condition = true
    }else{
        toggleErrorPasswordParagraphsFunc(scpecialCaraterForPassword,false)
        passwordValidationObj.Passowrd3condition = ""
    }
    console.log(passwordValidationObj, "password validation object")
}
//
passwordInput.addEventListener('blur',()=>{
    if(passwordValidationObj.Passowrd1condition === true &&
        passwordValidationObj.Passowrd2condition === true &&
        passwordValidationObj.Passowrd3condition === true
     ){
        // hide the condition div
        PasswordConditionUL.classList.add('hidden')
        passwordValidationObj.passwordValid = passwordInput.value.trim()
        ToggleSvgsFunc(pssFalseSvg,pssTrueeSvg,passwordSvgsHolder,false)
     }
})
// function toggle class for password error
function toggleErrorPasswordParagraphsFunc(el,condition){
        el.classList.toggle("text-red-500",!condition)
        el.classList.toggle("text-green-500",condition)
}
// validation of new password
confirmPass.addEventListener('blur',()=>{
        if(confirmPass.value.trim() === passwordValidationObj.passwordValid){
            console.log('passwrod match')
            ToggleSvgsFunc(confirmPssFalseSvg,confirmPssTrueSvg,confirmPssSvgsHolder,false)
            confirmPssError.classList.add('hidden')
        }else if(passwordInput.value.trim() !== "" && confirmPass.value.trim() !== passwordValidationObj.passwordValid){
            ToggleSvgsFunc(confirmPssFalseSvg,confirmPssTrueSvg,confirmPssSvgsHolder,true)
            console.log('we are inside else')
            confirmPssError.classList.remove('hidden')
        }
})