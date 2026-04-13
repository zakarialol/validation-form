const emailHolder = document.querySelector('[data-email="email"]')
const confirmOTPBtn = document.querySelector('[data-btn="confirmOTP"]')
const otptest  = document.querySelector("[data-opt='test']")
async function getEmailFunc(){
    console.log("getting the email function")
    try{
        const res = await fetch("http://localhost:3000/emailCode",{
            credentials: "include"
        })
        const data = await res.json()
        emailHolder.textContent = data.email
        sendEmailCodeFunc(data.email)
        optFunc(data.email)
        console.log(data)
        return data.email
    }catch(err){
        console.log("error",err)
    }
}
getEmailFunc()

// send the email function 
async function sendEmailCodeFunc(email){
    console.log(email,"email in front")
    try{
        const res = await fetch(`http://localhost:3000/retriveEmailCode`,{
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({email})
        })
        const data = await res.json()
        console.log(data)
    }catch(err){
        console.log("error",err)
    }
}
// 
async function optFunc(email){
    const response = await fetch("http://localhost:3000/send-otp",{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify({email})
    })
    const data = await response.json()
    console.log(data, "data from the opt send")
}
//
confirmOTPBtn.addEventListener('click',async()=>{
    console.log("you just clicked confirm")
    const email =await getEmailFunc()
    console.log(email,"email")
    const otp = otptest.value.trim() 
    console.log(otp , "otpv")
    const response = await fetch("http://localhost:3000/verify-otp",{
        method:"POST",
        headers :{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({email,otp})
    })
    const data = await response.json()
    console.log(data)
})