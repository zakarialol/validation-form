const main = document.getElementsByTagName('main')
console.log(main)
async function userinfo(){
    const response = await fetch("http://localhost:3000/userInfo")
    const data = await response.json()
    console.log(data)
    const obj = Object.values(data)[1]
    console.log(obj,"obj")
    let html = `<div class = "p-4 min-w-[335px]">
                    <div class = "flexUserInfo">
                        <p class = "text-[#8B302D]">first name: :</p><span>${obj.firstName}<span>
                    </div>

                    <div class = "flexUserInfo">
                        <p class = "text-[#8B302D]">last name :</p><span>${obj.lastName}<span>
                    </div>
                    <div class = "flexUserInfo">
                        <p class = "text-[#8B302D]">password :</p><span>${obj.password}<span>
                    </div>
                    <div class = "flexUserInfo">
                        <p class = "text-[#8B302D]">gender :</p><span>${obj.gender}<span>
                    </div>
                    <div class = "flexUserInfo">
                        <p class = "text-[#8B302D]">skill :</p><span>${obj.skill}<span>
                    </div>
                    <div class = "flexUserInfo">
                        <p class = "text-[#8B302D]">email :</p><span>${obj.email}<span>
                    </div>
                    <div class = "flexUserInfo">
                        <p class = "text-[#8B302D]">address :</p><span>${obj.address}<span>
                    </div>
                    <div class = "flexUserInfo">
                        <p class = "text-[#8B302D]">phone :</p><span>${obj.phone}<span>
                    </div>                     
                    <div class = "flexUserInfo">
                        <p class = "text-[#8B302D]">date :</p><span>${obj.date}<span>
                    </div>

                </div>
    `
    console.log(html)
    main[0].insertAdjacentHTML("beforeend",html)
}
userinfo()
console.log("hello inside dasheboard")