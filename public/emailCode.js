const emailHolder = document.querySelector('[data-email="email"]')
const confirmOTPBtn = document.querySelector('[data-btn="confirmOTP"]')
const inputsVerificationOtp = document.querySelectorAll('[data-div="otp-inputs"] input')
const ErroOtpMsg = document.querySelector('[data-otp="otp-holder"]')
async function getEmailFunc(){
    console.log("getting the email function")
    try{
        const res = await fetch("http://localhost:3000/emailCode",{
            credentials: "include"
        })
        const data = await res.json()
        console.log('data',data)
        emailHolder.textContent = data.email
        return data.email
    }catch(err){
        console.log("error",err)
    }
}
getEmailFunc()
//
confirmOTPBtn.addEventListener('click',async()=>{
    console.log("you just clicked confirm")
    const email = await getEmailFunc()
    console.log(email,"email")
    let otp = Array.from(inputsVerificationOtp).map(input => input.value).join("") ;
    // for(let i = 0 ; i<inputsVerificationOtp.length ; i++){
    //     otp +=inputsVerificationOtp[i]?.value
    // }
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
        window.location.href = './emailVerSucces.html'
    }else{
        ErroOtpMsg.textContent = data.message
    }
    console.log(data)
    // 
        // const res  = await fetch("https://69caf052ba5984c44bf3fc7c.mockapi.io/loginapi/v1/loginform",{
    //     method:"POST",
    //     headers:{
    //         "Content-Type" : "application/json"
    //     },
    //     body:JSON.stringify(Object.fromEntries(formData))
    // })
})
// working the inputs 
function verificationInputFunc(){
    inputsVerificationOtp.forEach((input,index)=>{
        input.addEventListener('input',()=>{
            if(input.value){
                console.log('hello you just presset the input')
                input.nextElementSibling?.focus()
            }else{
                input.previousElementSibling?.focus()
            }
        })
    })
}
verificationInputFunc()
