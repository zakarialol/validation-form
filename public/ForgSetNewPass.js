const confirmPasswordInputDiv = document.querySelector('[data-input="ConfirmPasswordInputDiv"]')
const PasswordInputDiv = document.querySelector("[data-input='PasswordInputDiv']")
const viewPasswordBtn = document.querySelector('[data-btn="viewPassword"]')
const viewConfirmPasswordBtn  = document.querySelector('[data-btn="viewConfirmPassword"]')
const passwordInput =  document.getElementById("newPassword")
const viewPasswordbtnSvgs = document.querySelectorAll("[data-btn='viewPassword'] svg")
const confirmPass = document.getElementById('ConfirmNewPassword')
const viewConfirmPasswordbtnSvgs = document.querySelectorAll("[data-btn='viewConfirmPassword'] svg")
const NewPasswordInput = document.getElementById('newPassword')
const PasswordConditionUL = document.getElementById('PasswordConditionUL')
//slectiong element in password form
const pssFalseSvg = document.getElementById('passwordFalsesvg')
const pssTrueeSvg = document.getElementById('passwordTruesvg')
const passwordSvgsHolder = document.querySelector("[data-valid='password']")
//confirm new password
const confirmPssTrueSvg = document.getElementById('confirmPasswordTruesvg')
const confirmPssFalseSvg = document.getElementById('confirmPasswordFalsesvg')
const confirmPssSvgsHolder = document.querySelector('[data-valid="confirmPassword"]')
const confirmPssError = document.querySelector('[data-valid="confirmPssError"]')
//
const NewPassL = document.getElementById("passowrdContUppCaL")
const NewPassNbr = document.getElementById("psswordContNbrL")
const NewPassSpeclLtr = document.getElementById("passwordContSpclCaratrL")
// import things i need
const NewPassFormSubmit = document.getElementById('NewPassForm')
import { verfyPassword,objeNewPass,ToggleSvgsFunc } from "./state.js"
//
confirmPasswordInputDiv.addEventListener("mouseenter",()=>{
    console.log('you just hover on the new passworkd')
    viewConfirmPasswordBtn.classList.remove('hidden')
})
confirmPasswordInputDiv.addEventListener("mouseleave",()=>{
    console.log('you just left on the new passworkd')
    viewConfirmPasswordBtn.classList.add('hidden')
})
PasswordInputDiv.addEventListener('mouseenter',()=>{
    viewPasswordBtn.classList.remove('hidden')
})
PasswordInputDiv.addEventListener('mouseleave',()=>{
    viewPasswordBtn.classList.add('hidden')
})

//view button 
viewPasswordBtn.addEventListener('click',(e)=>{
    passwordInput.type =  passwordInput.type === "password"? "text" : "password";
    svgPassowrdEye(viewPasswordbtnSvgs)

})
// hide eye or view 
function svgPassowrdEye(els){
    els.forEach(item =>{
        item.classList.toggle('hidden')
    })
}
// confirm password view button
viewConfirmPasswordBtn.addEventListener('click',(e)=>{
    confirmPass.type = confirmPass.type === "password"? "text" : "password"
    // viewConfirmPasswordbtnSvgs 
    svgPassowrdEye(viewConfirmPasswordbtnSvgs)
})
//
let newPassObj = {}
NewPasswordInput.addEventListener('focus',()=>{
    console.log('hello you"re in the newPas input')
    PasswordConditionUL.classList.remove('hidden')
})
//
NewPasswordInput.addEventListener('input',()=>{
    let value = NewPasswordInput.value.trim()
    verfyPassword({passwordInputValue:value,passValidationObject:newPassObj,passwordValidation:{upperCaseLetter:NewPassL,number:NewPassNbr,specialCarater:NewPassSpeclLtr}})
})
//blur
NewPasswordInput.addEventListener('blur',()=>{
    console.log(newPassObj)
    if(newPassObj.Passowrd1condition  &&
        newPassObj.Passowrd2condition &&
        newPassObj.Passowrd3condition 
     ){
        // hide the condition div
        console.log("in the true condition **")
        passwordInput.classList.remove("box-ShadowErrorClr")
        NewPassFormFunc(passwordInput,true)
        PasswordConditionUL.classList.add('hidden')
        newPassObj.passwordValid = passwordInput.value.trim()
        ToggleSvgsFunc(pssFalseSvg,pssTrueeSvg,passwordSvgsHolder,true)
     }else{
        console.log("in the false condition **")
        ToggleSvgsFunc(pssFalseSvg,pssTrueeSvg,passwordSvgsHolder,false)
        NewPassFormFunc(passwordInput,false)
    }
})
//
//todo function to store form data
function NewPassFormFunc(El,condition){
        console.log('entring the stor data')
        ;(objeNewPass[El.name]??={})[El.name] = condition
        ;(objeNewPass[El.name]??={})["element"] = El
}
//
confirmPass.addEventListener('blur',()=>{
        console.log(newPassObj,"***")
        if(confirmPass.value.trim() === newPassObj.passwordValid){
            confirmPass.classList.remove("box-ShadowErrorClr")
            NewPassFormFunc(confirmPass,true)
            ToggleSvgsFunc(confirmPssFalseSvg,confirmPssTrueSvg,confirmPssSvgsHolder,true)
            confirmPssError.classList.add('hidden')
        }else if(passwordInput.value.trim() !== "" && confirmPass.value.trim() !== newPassObj.passwordValid){
            NewPassFormFunc(confirmPass,false)
            ToggleSvgsFunc(confirmPssFalseSvg,confirmPssTrueSvg,confirmPssSvgsHolder,false)
            confirmPssError.classList.remove('hidden')
        }
})

// send button

NewPassFormSubmit.addEventListener('submit',async(e)=>{
    e.preventDefault()
    console.log('hello you just pressed the submit button')
    NewPassFormSubmit.disabled = true
    let response = await fetch("http://localhost:3000/getemailCodeSendOn")
    let result = await response.json()
    console.log(result.email)
    const formData = new FormData(NewPassFormSubmit);
    let ObjectFormValues = Object.values(objeNewPass)
    let NotValidInput = ObjectFormValues.find(itm=>{
        return itm[Object.keys(itm)[0]] === false
    })
    NotValidInput?.element.scrollIntoView({
            behavior:"smooth",
            block:"center"
    })
    NotValidInput?.element.classList.add('box-ShadowErrorClr')
    console.log(NotValidInput,"not valid input")
    if(!NotValidInput){
        // console.log(ObjectForm,"objecform")
        // emailverification.email = ObjectForm.email.element.value.trim();
        // console.log(emailverification,"email verification")
        return true
    }
})
//function to fund the user that i will change the password on

//
// export function validFormInputsFunc(){
//     if(!NotValidInput){
//         console.log(ObjectForm,"objecform")
//         emailverification.email = ObjectForm.email.element.value.trim();
//         console.log(emailverification,"email verification")
//         return true
//     }else{
//         return false
//     }
// }