//todo select elements 
const firstNameInput = document.getElementById("firstName")
const lastNameInput = document.getElementById("last-name")
const fTrueSvg = document.querySelector('[data-valid="firstName"] #fNameTruesvg')
const fFalseSvg = document.querySelector('[data-valid="firstName"] #fNameFalsesvg')
const firstNameSvgsHolder = document.querySelector('[data-valid="firstName"]')
const lTrueSvg = document.querySelector('[data-valid="lastName"] #LNameTruesvg')
const lFalseSvg = document.querySelector('[data-valid="lastName"] #LNameFalsesvg')
const lastNameSvgsHolder = document.querySelector('[data-valid="lastName"]')
//todo passord selectors 
const passwordInput =  document.getElementById("passwordInput")
const PasswordConditionUL = document.getElementById("PasswordConditionUL")
const passwordSvgsHolder = document.querySelector("[data-valid='password']")
const upperCaseLetterForPassword = document.getElementById("passowrdContUppCaL")
const numberPasswordForPassword = document.getElementById("psswordContNbrL")
const scpecialCaraterForPassword = document.getElementById("passwordContSpclCaratrL")
const pssFalseSvg = document.getElementById('passwordFalsesvg')
const pssTrueeSvg = document.getElementById('passwordTruesvg')
//todo confirm Password 
const confirmPass = document.getElementById('confirm-pass')
const confirmPssTrueSvg = document.getElementById('confirmPasswordTruesvg')
const confirmPssFalseSvg = document.getElementById('confirmPasswordFalsesvg')
const confirmPssSvgsHolder = document.querySelector('[data-valid="confirmPassword"]')
const confirmPssError = document.querySelector('[data-valid="confirmPssError"]')
//todo view button 
const viewPasswordBtn = document.querySelector("[data-btn='viewPassword']")
const viewConfirmPasswordBtn = document.querySelector("[data-btn='viewConfirmPassword']")
const PasswordInputDiv = document.querySelector("[data-input='PasswordInputDiv']")
const viewPasswordbtnSvgs = document.querySelectorAll("[data-btn='viewPassword'] svg")
const viewConfirmPasswordbtnSvgs = document.querySelectorAll("[data-btn='viewConfirmPassword'] svg")
const confirmPasswordInputDiv = document.querySelector('[data-input="ConfirmPasswordInputDiv"]')
//select gender
const genderSelect = document.getElementById('selectGender')
//todo email validation
const emailInput = document.getElementById('email')
const emailSvgsDiv = document.querySelector('[data-valid="eamilSvgsDiv"]')
const emailFalseSvg = document.getElementById('emailFalsesvg')
const emailTrueSvg = document.getElementById('emailTruesvg')
const emailErrorParagraph = document.getElementById('emailErrorParagraph')
//todo phone validation
const phoneInput = document.getElementById('phone')
const phoneSvgHolder = document.querySelector('[data-valid="phoneSvgsDiv"]')
const phoneFalseSvg = document.getElementById('phoneFalsesvg')
const phoneTrueSvg = document.getElementById('phoneTruesvg')
const phoneErrParagraph = document.getElementById('phoneErrorParagraph')
//todo address validation
const addressTextArea = document.getElementById("address")
const addressSvgsHolder = document.querySelector("[data-valid='addressSvgsDiv']")
const addressFalseSvg = document.getElementById('addressFalsesvg')
const addressTrueSvg = document.getElementById('addressTruesvg')
const addressErroParagraph = document.getElementById('addressErrorParagraph')
//todo postal code validation
const postalCodeInput = document.getElementById('postal-code')
const postalCodeSvgHolder = document.querySelector('[data-valid="postalcodeSvgsDiv"]')
const postalCodeFalseSvg = document.getElementById('postalCodeFalsesvg')
const postalCodeTrueSvg = document.getElementById("postalCodeTruesvg")
const postalCodeErrorMsg = document.getElementById('postalCodeErroParagraph')
// import elements
import { signUpBtn ,ObjectForm } from "./state.js";
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
function ValidationFunc({El,regex,mainHolder,svgFalse,svgTrue,erroEl}){
        let NameV = El.value.trim()
        let regexTest = regex
        if(regexTest.test(NameV)){
            ToggleSvgsFunc(svgTrue,svgFalse,mainHolder,true);
            storFormDataFunc(El,true)
            console.log(ObjectForm)
            if(erroEl) erroEl.classList.add('hidden')   
        }else if(NameV.trim()=== "" || !regexTest.test(NameV)){
            storFormDataFunc(El,false)
            console.log(ObjectForm)
            ToggleSvgsFunc(svgTrue,svgFalse,mainHolder,false)
            if(erroEl) erroEl.classList.remove('hidden')   
        }
    // })
}
firstNameInput.addEventListener("blur",()=>{
    // ValidationFunc(firstNameInput,/^[a-zA-Z\s]{2,}$/,firstNameSvgsHolder,fFalseSvg,fTrueSvg)
    ValidationFunc({
        El:firstNameInput,regex:/^[a-zA-Z\s]{2,}$/,mainHolder:firstNameSvgsHolder,svgFalse:fFalseSvg,svgTrue:fTrueSvg,
    })
})

// validation of the svgs 
function ToggleSvgsFunc(svgFalseEl,svgTrueEl,mainHolder,condition){
            mainHolder.classList.remove('hidden')
            svgFalseEl.classList.toggle('hidden',!condition)
            svgTrueEl.classList.toggle('hidden',condition)
}
// validtion of last name 
lastNameInput.addEventListener("blur",()=>{
    ValidationFunc({
        El:lastNameInput,regex:/^[a-zA-Z\s]{2,}$/,mainHolder:lastNameSvgsHolder,svgFalse:lFalseSvg,svgTrue:lTrueSvg,
    })
})
// about passord
passwordInput.addEventListener('input',()=>{
    let passwordValue = passwordInput.value.trim()
    verfyPassword(passwordValue)
})
PasswordInputDiv.addEventListener('mouseenter',()=>{
    viewPasswordBtn.classList.remove('hidden')
})
PasswordInputDiv.addEventListener('mouseleave',()=>{
    viewPasswordBtn.classList.add('hidden')
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
}
//
passwordInput.addEventListener('blur',()=>{
    // viewPasswordBtn.classList.add("hidden")
    if(passwordValidationObj.Passowrd1condition  &&
        passwordValidationObj.Passowrd2condition &&
        passwordValidationObj.Passowrd3condition 
     ){
        // hide the condition div
        storFormDataFunc(passwordInput,true)
        PasswordConditionUL.classList.add('hidden')
        passwordValidationObj.passwordValid = passwordInput.value.trim()
        ToggleSvgsFunc(pssFalseSvg,pssTrueeSvg,passwordSvgsHolder,false)
     }else{
        storFormDataFunc(passwordInput,false)
    }
})
// function toggle class for password error
function toggleErrorPasswordParagraphsFunc(el,condition){
        el.classList.toggle("text-red-500",!condition)
        el.classList.toggle("text-green-500",condition)
}
confirmPass.addEventListener('blur',()=>{
        if(confirmPass.value.trim() === passwordValidationObj.passwordValid){
            storFormDataFunc(confirmPass,true)
            console.log(ObjectForm)
            ToggleSvgsFunc(confirmPssFalseSvg,confirmPssTrueSvg,confirmPssSvgsHolder,false)
            confirmPssError.classList.add('hidden')
        }else if(passwordInput.value.trim() !== "" && confirmPass.value.trim() !== passwordValidationObj.passwordValid){
            storFormDataFunc(confirmPass,false)
            ToggleSvgsFunc(confirmPssFalseSvg,confirmPssTrueSvg,confirmPssSvgsHolder,true)
            confirmPssError.classList.remove('hidden')
        }
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
confirmPasswordInputDiv.addEventListener("mouseenter",()=>{
    viewConfirmPasswordBtn.classList.remove('hidden')
})
confirmPasswordInputDiv.addEventListener("mouseleave",()=>{
    viewConfirmPasswordBtn.classList.add('hidden')
})
// working on select genger
genderSelect.addEventListener('change',()=>{
    if(genderSelect.value){
        genderSelect.classList.remove('opacity-50')
    }
})
//todo function to store form data
function storFormDataFunc(El,condition){
        console.log('entring the storm data')
        ;(ObjectForm[El.name]??={})[El.name] = condition
        ;(ObjectForm[El.name]??={})["element"] = El
}
//todo validation of email
emailInput.addEventListener('blur',()=>{
    console.log('validation of email')
    ValidationFunc({El:emailInput,regex:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,mainHolder:emailSvgsDiv,svgFalse:emailFalseSvg,svgTrue:emailTrueSvg,erroEl:emailErrorParagraph})
    console.log('you just left email input')
})
//todo phone validation 
phoneInput.addEventListener('blur',()=>{
    ValidationFunc({
        El:phoneInput,regex:/^0\d{9}$/,mainHolder:phoneSvgHolder,svgFalse:phoneFalseSvg,svgTrue:phoneTrueSvg,erroEl:phoneErrParagraph,
    })
})
//todo address
addressTextArea.addEventListener('blur',()=>{
        ValidationFunc({
        El:addressTextArea,regex:/^(?=.{15,}$)[a-zA-Z0-9]+\s+.+$/,mainHolder:addressSvgsHolder,svgFalse:addressFalseSvg,svgTrue:addressTrueSvg,erroEl:addressErroParagraph,
    })
})
// todo validation postal-code
postalCodeInput.addEventListener('blur',()=>{
    ValidationFunc({
        El:postalCodeInput,regex:/^\d{5}$/,mainHolder:postalCodeSvgHolder,svgFalse:postalCodeFalseSvg,svgTrue:postalCodeTrueSvg,erroEl:postalCodeErrorMsg,
    })
})