//todo select elements 
const firstNameInput = document.getElementById("firstName")
const lastNameInput = document.getElementById("last-name")
const fTrueSvg = document.querySelector('[data-valid="firstName"] #fNameTruesvg')
const fFalseSvg = document.querySelector('[data-valid="firstName"] #fNameFalsesvg')
const firstNameSvgsHolder = document.querySelector('[data-valid="firstName"]')
const lTrueSvg = document.querySelector('[data-valid="lastName"] #LNameTruesvg')
const lFalseSvg = document.querySelector('[data-valid="lastName"] #LNameFalsesvg')
const lastNameSvgsHolder = document.querySelector('[data-valid="lastName"]')
const passwordConditions = document.getElementById('passwordConditions')
const notMuchPass = document.getElementById('notMuchPass')
const emailErroMsg = document.getElementById('emailErroMsg')
const phoneMsgError = document.getElementById('phoneMsgError')
const adreessErrorMsg = document.getElementById('adreessErrorMsg')
const postalErrorMsg = document.getElementById('postalErrorMsg')
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
import { signUpBtn ,ObjectForm,verfyPassword,ToggleSvgsFunc } from "./state.js";
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
function ValidationFunc({El,regex,mainHolder,svgFalse,svgTrue,erroEl,elHeight}){
        let NameV = El.value.trim()
        let regexTest = regex
        if(regexTest.test(NameV)){
            El.classList.remove("box-ShadowErrorClr")
            ToggleSvgsFunc(svgTrue,svgFalse,mainHolder,false);
            storFormDataFunc(El,true)
            console.log(ObjectForm)
            if(erroEl) erroEl.style.height = 0 
        }else if(NameV.trim()=== "" || !regexTest.test(NameV)){
            storFormDataFunc(El,false)
            console.log(ObjectForm)
            ToggleSvgsFunc(svgTrue,svgFalse,mainHolder,true)
            if(erroEl) erroEl.style.height = elHeight + "px" 
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
// function ToggleSvgsFunc(svgFalseEl,svgTrueEl,mainHolder,condition){
//             mainHolder.classList.remove('hidden')
//             svgFalseEl.classList.toggle('hidden',!condition)
//             svgTrueEl.classList.toggle('hidden',condition)
// }
// validtion of last name 
lastNameInput.addEventListener("blur",()=>{
    ValidationFunc({
        El:lastNameInput,regex:/^[a-zA-Z\s]{2,}$/,mainHolder:lastNameSvgsHolder,svgFalse:lFalseSvg,svgTrue:lTrueSvg,
    })
})
// about passord
let passwordValidationObj = {}
passwordInput.addEventListener('input',()=>{
    let passwordValue = passwordInput.value.trim()
    verfyPassword({passwordInputValue:passwordValue,passValidationObject:passwordValidationObj,passwordValidation:{upperCaseLetter:upperCaseLetterForPassword,number:numberPasswordForPassword,specialCarater:scpecialCaraterForPassword}})
})
PasswordInputDiv.addEventListener('mouseenter',()=>{
    viewPasswordBtn.classList.remove('hidden')
})
PasswordInputDiv.addEventListener('mouseleave',()=>{
    viewPasswordBtn.classList.add('hidden')
})
passwordInput.addEventListener('focus',()=>{
    console.log(passwordConditions.scrollHeight)
    // PasswordConditionUL.classList.remove('hidden')
    PasswordConditionUL.style.height = passwordConditions.scrollHeight + "px"
})

//
passwordInput.addEventListener('blur',()=>{
    // viewPasswordBtn.classList.add("hidden")
    if(passwordValidationObj.Passowrd1condition  &&
        passwordValidationObj.Passowrd2condition &&
        passwordValidationObj.Passowrd3condition 
     ){
        // hide the condition div
        passwordInput.classList.remove("box-ShadowErrorClr")
        storFormDataFunc(passwordInput,true)
        PasswordConditionUL.style.height = 0 + "px"
        passwordValidationObj.passwordValid = passwordInput.value.trim()
        ToggleSvgsFunc(pssFalseSvg,pssTrueeSvg,passwordSvgsHolder,true)
     }else{
        ToggleSvgsFunc(pssFalseSvg,pssTrueeSvg,passwordSvgsHolder,false)
        storFormDataFunc(passwordInput,false)
    }
})
confirmPass.addEventListener('blur',()=>{
        console.log(passwordValidationObj,"***")
        if(confirmPass.value.trim() === passwordInput.value.trim()){
            confirmPass.classList.remove("box-ShadowErrorClr")
            storFormDataFunc(confirmPass,true)
            console.log(ObjectForm)
            ToggleSvgsFunc(confirmPssFalseSvg,confirmPssTrueSvg,confirmPssSvgsHolder,true)
            console.log(confirmPssError,notMuchPass.scrollHeight)
            confirmPssError.style.height = 0 + "px"
        }else if(passwordInput.value.trim() !== "" && confirmPass.value.trim() !== passwordInput.value.trim()){
            console.log("password don't much")
            storFormDataFunc(confirmPass,false)
            ToggleSvgsFunc(confirmPssFalseSvg,confirmPssTrueSvg,confirmPssSvgsHolder,false)
             confirmPssError.style.height = notMuchPass.scrollHeight + 'px'
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
        console.log('entring the stor data')
        ;(ObjectForm[El.name]??={})[El.name] = condition
        ;(ObjectForm[El.name]??={})["element"] = El
}
//todo validation of email
emailInput.addEventListener('blur',()=>{
    console.log('validation of email')
    let heightt = emailErroMsg.scrollHeight
    ValidationFunc({El:emailInput,regex:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,mainHolder:emailSvgsDiv,svgFalse:emailFalseSvg,svgTrue:emailTrueSvg,erroEl:emailErrorParagraph,elHeight:heightt})
    console.log('you just left email input')
})
//todo phone validation 
phoneInput.addEventListener('blur',()=>{
    let heightt = phoneMsgError.scrollHeight
    ValidationFunc({
        El:phoneInput,regex:/^0\d{9}$/,mainHolder:phoneSvgHolder,svgFalse:phoneFalseSvg,svgTrue:phoneTrueSvg,erroEl:phoneErrParagraph,elHeight:heightt
    })
})
//todo address
addressTextArea.addEventListener('blur',()=>{
    let heightt = adreessErrorMsg.scrollHeight
        ValidationFunc({
        El:addressTextArea,regex:/^(?=.{15,}$)[a-zA-Z0-9]+\s+.+$/,mainHolder:addressSvgsHolder,svgFalse:addressFalseSvg,svgTrue:addressTrueSvg,erroEl:addressErroParagraph,elHeight:heightt
    })
})
// todo validation postal-code
postalCodeInput.addEventListener('blur',()=>{
    let heightt = postalErrorMsg.scrollHeight
    ValidationFunc({
        El:postalCodeInput,regex:/^\d{5}$/,mainHolder:postalCodeSvgHolder,svgFalse:postalCodeFalseSvg,svgTrue:postalCodeTrueSvg,erroEl:postalCodeErrorMsg,elHeight:heightt
    })
})