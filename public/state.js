export const signUpBtn = document.querySelector("#registerBtn")
// export const ArrayFormValues = []
export const ObjectForm = {}
export const objeNewPass= {}
export let emailverification = {
    email: ""
}
export const form = document.getElementById('registerForm')
//
export async function confirmOptFunc({inputs,erroOtpMsg,page,email}){

    console.log(email,"email send to the confirm")
    let otp = Array.from(inputs).map(input => input.value).join("") ;
    console.log(otp , "otpv")
    const response = await fetch("http://localhost:3000/verify-otp",{
        method:"POST",
        headers :{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({email,otp})
    })
    const data = await response.json()
    if(data.success){
        // await storeToMock()
        window.location.href = page
    }else{
        erroOtpMsg.textContent = data.message
    }
    console.log(data)
}
//store the objecform
// async function storeToMock(){
//     console.log(ObjectForm)
//     try{
//     const response = await fetch("https://69caf052ba5984c44bf3fc7c.mockapi.io/loginapi",{
//         method: "POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify({firstName:"zakaria"})
//     })
//     }catch(err){
//         console.log("Error",err)
//     }
// }
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
    const response = await fetch("http://localhost:3000/send-otp",{
    method: "POST",
    headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({email})
    })
    const result = await response.json()
    console.log('result', result)
}
//
export async function getEmailFunc(el){
    console.log(el)
    try{
        const res = await fetch("http://localhost:3000/getemailCodeSendOn",{
            credentials: "include"
        })
        const data = await res.json()
        console.log('data',data)
        el.textContent = data.email
        return data.email
    }catch(err){
        console.log("error",err)
    }
}

//
export function verfyPassword({passwordInputValue,passValidationObject,passwordValidation}){
    const {upperCaseLetter,number,specialCarater} = passwordValidation
    console.log(upperCaseLetter,"uppercase letter inside state")
    console.log(specialCarater,"scpecial  inside state")
    console.log(passwordValidation)
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
