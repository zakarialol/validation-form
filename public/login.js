// slectin elemetns 
const loginBtn = document.querySelector('[data-form="login-form"]')
const loginInput = document.querySelector('[data-input="loginUser"]')
console.log(loginInput,"login password")
const loginPassword = document.querySelector('[data-input="password"]')
console.log(loginPassword,'login password')
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
        const res = await fetch("https://69caf052ba5984c44bf3fc7c.mockapi.io/loginapi/v1/loginform")
        const data = await res.json()
        console.log(data,'the is the data weve got')
        verifyUserFunc(user,password,data)
    }catch(err){
        console.log("something went wrong please try again",err.message)
    }
}
// function to verfiy the user
function verifyUserFunc(user,password,data){
    console.log(user,'user')
    console.log(password,'password')
    let userFound = data.find(itm=>{
        if(itm.email === user || itm.firstName === user){
            return itm
        }
    })
    console.log(userFound,'user')
    if(userFound && userFound.password === password){
        console.log("loggin succes congratulition ***")
    }else{
        console.log("email or password wrong")
    }
}
