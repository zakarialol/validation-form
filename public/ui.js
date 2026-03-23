//select elements 
const firstNameInput = document.getElementById("firstName")
const lastNameNameInput = document.getElementById("lastName")
const fTrueSvg = document.querySelector('[data-valid="firstName"] #fNameTruesvg')
const fFalseSvg = document.querySelector('[data-valid="firstName"] #fNameFalsesvg')
const firstNameSvgsHolder = document.querySelector('[data-valid="firstName"]')
const lTrueSvg = document.querySelector('[data-valid="lastName"] #lNameTruesvg')
const lFalseSvg = document.querySelector('[data-valid="lastName"] #lNameFalsesvg')
const lastNameSvgsHolder = document.querySelector('[data-valid="lastName"]')
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
function NameValidationFunc(El,regex,mainHolder){
        let NameV = El.value
        let regexTest = regex
        if(regexTest.test(NameV)){
            ToggleSvgsFunc(fTrueSvg,fFalseSvg,mainHolder,"toggle",true)
        }else if(NameV.trim()==="" || !regexTest.test(NameV)){
            ToggleSvgsFunc(fTrueSvg,fFalseSvg,mainHolder,"toggle",false)
        }
    // })
}
firstNameInput.addEventListener("blur",()=>{
    NameValidationFunc(firstNameInput,/^[a-zA-Z]{2,}$/,firstNameSvgsHolder)
})
// validation of the svgs 
function ToggleSvgsFunc(svgFalseEl,svgTrueEl,mainHolder,action,condition){
            mainHolder.classList.remove('hidden')
            svgFalseEl.classList[action]('hidden',!condition)
            svgTrueEl.classList[action]('hidden',condition)
}
// function firstNameToggleSvgsFunc(condition){
//         fTrueSvg.classList.toggle('hidden',!condition)
//         fFalseSvg.classList.toggle('hidden',condition)
// }
// validation of lastName 

