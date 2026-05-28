// slectin elemetns 
const loginBtn = document.querySelector('[data-form="login-form"]')
const loginInput = document.querySelector('[data-input="loginUser"]')
const loginPassword = document.querySelector('[data-input="password"]')
const loginButton = document.getElementById('loginButton')
const signUpErrorHolder = document.getElementById('signUpErrorHolder')
const signUpErrorMsg = document.getElementById('signUpErrorMsg')
//
import { ErrorDisplay,svg } from "./state.js"
//
loginBtn.addEventListener("submit",(e)=>{
    e.preventDefault()
    loginFormFunc()
})
function loginFormFunc(){
    console.log('you just pressed the login btn')
    CheckApiUsersFunc()
}
// function to check the api
async function CheckApiUsersFunc(){
    const user = loginInput.value.trim()
    const password = loginPassword.value.trim()
    try{
        loginButton.innerHTML = `loggin... ${svg}`
        loginButton.disabled = true
        const res = await fetch("https://69caf052ba5984c44bf3fc7c.mockapi.io/loginapi/v1/loginform")
        const data = await res.json()
        // console.log(data,'the is the data weve got')
        await verifyUserFunc(user,password,data)
    }catch(err){
        console.log("something went wrong please try again",err.message)
    }finally{
        loginButton.disabled = false
        loginButton.textContent = "login"
    }
}
// function to verfiy the user
async function verifyUserFunc(user,password,data){
    let userFound = data.find(itm=>{
        if(itm.email === user || itm.firstName === user){
            return itm
        }
    })
    if(userFound && userFound.password === password){
        try{
            loginButton.innerHTML = `loggin... ${svg}`
            loginButton.disabled = true
            const res = await fetch("http://localhost:3000/storeValidUser",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(userFound)
            })
            const data = await res.json()
            console.log(data,'data')
            window.location.href = "./dashboard.html"
            console.log("loggin succes congratulition ***")
        }catch(err){
            console.log("error",err)
        }finally{
            loginButton.disabled = false
            loginButton.textContent = "login"
        }
    }else{
        console.log("email or password wrong")
        ErrorDisplay(signUpErrorHolder,signUpErrorMsg)
    }
}
// sing up error function
