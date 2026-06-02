export const signUpBtn = document.querySelector("#registerBtn")
// export const ArrayFormValues = []
export const ObjectForm = {}
export const objeNewPass= {}
export let emailverification = {
    email: ""
}
export const svg = `<svg fill="currentColor" class="w-4 h-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g><circle cx="12" cy="2.5" r="1.5" opacity=".14"/><circle cx="16.75" cy="3.77" r="1.5" opacity=".29"/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43"/><circle cx="21.50" cy="12.00" r="1.5" opacity=".57"/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71"/><circle cx="16.75" cy="20.23" r="1.5" opacity=".86"/><circle cx="12" cy="21.5" r="1.5"/><animateTransform attributeName="transform" type="rotate" calcMode="discrete" dur="0.75s" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" repeatCount="indefinite"/></g>
    </svg>`
//
export const form = document.getElementById('registerForm')
export async function confirmOptFunc({inputs,erroOtpMsg,email}){

    let otp = Array.from(inputs).map(input => input.value).join("") ;
    const response = await fetch("/verify-otp",{
        method:"POST",
        headers :{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({email,otp})
    })
    const data = await response.json()
    return data
}
export async function optFunc(email){
    const response = await fetch("/send-otp",{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email})
    })
    const data = await response.json()
    console.log(data,'data')
}
export function ErrorDisplay(holder,msg){
    const heightt = msg.scrollHeight
    holder.style.height = heightt + "px"
    setTimeout(()=>{
        holder.style.height = 0 + "px"
    },2500)
}

//
export async function checkIfEmailexistInDataBaseFunc(email){
    try{
        const response = await fetch("https://69caf052ba5984c44bf3fc7c.mockapi.io/loginapi/v1/loginform")
        const data = await response.json()
        const existedEmail = data.find(obj=>{
            return obj.email === email
        })
        return existedEmail ? true : false
    }catch(err){
        console.log('error',err)
    }
}
//
export function verificationInputFunc(inputs){

        inputs.forEach((input,index)=>{
        input.addEventListener('input',()=>{
            if(input.value){
                input.nextElementSibling?.focus()
            }else{
                input.previousElementSibling?.focus()
            }
        })
    })
}
// 
export async function sendOtpFunc(email){
    const response = await fetch("/send-otp",{
    method: "POST",
    headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({email})
    })
    const result = await response.json()
    console.log('result insde send otp',result)
}
//
export async function getEmailFunc(el){
    try{
        const res = await fetch("/getemailCodeSendOn",{
            credentials: "include"
        })
        const data = await res.json()
        el.textContent = data.email
        return data.email
    }catch(err){
        console.log("error",err)
    }
}

//
export function verfyPassword({passwordInputValue,passValidationObject,passwordValidation}){
    const {upperCaseLetter,number,specialCarater} = passwordValidation
    if(/(?=.*[A-Z]).{6,}/.test(passwordInputValue)){
        toggleErrorPasswordParagraphsFunc(upperCaseLetter,true)
        passValidationObject.Passowrd1condition = true
    }else{
        toggleErrorPasswordParagraphsFunc(upperCaseLetter,false)
        passValidationObject.Passowrd1condition = ""
    }

    if(/\d+/.test(passwordInputValue)){
        toggleErrorPasswordParagraphsFunc(number,true)
        passValidationObject.Passowrd2condition = true
    }else{
        toggleErrorPasswordParagraphsFunc(number,false)
        passValidationObject.Passowrd2condition = ""
    }

    if(/[^a-zA-Z0-9]/.test(passwordInputValue)){
        toggleErrorPasswordParagraphsFunc(specialCarater,true)
        passValidationObject.Passowrd3condition = true
    }else{
        toggleErrorPasswordParagraphsFunc(specialCarater,false)
        passValidationObject.Passowrd3condition = ""
    }
}
//
// function toggle class for password error
function toggleErrorPasswordParagraphsFunc(el,condition){
        el.classList.toggle("text-red-500",!condition)
        el.classList.toggle("text-green-500",condition)
}
//
// validation of the svgs 
export function ToggleSvgsFunc(svgFalseEl,svgTrueEl,mainHolder,condition){
            mainHolder.classList.remove('hidden')
            svgFalseEl.classList.toggle('hidden',condition)
            svgTrueEl.classList.toggle('hidden',!condition)
}

export function svgPassowrdEye(els){
    els.forEach(item =>{
        item.classList.toggle('hidden')
    })
}