//import thing we need 
import {form ,ObjectForm,emailverification} from "./state.js"
export function validFormInputsFunc(){
    console.log('hello we are inside the validation form')
     const formData = new FormData(form);
    let ObjectFormValues = Object.values(ObjectForm)
    let NotValidInput = ObjectFormValues.find(itm=>{
        return itm[Object.keys(itm)[0]] === false
    })
    NotValidInput?.element.scrollIntoView({
            behavior:"smooth",
            block:"center"
    })
    NotValidInput?.element.classList.add('box-ShadowErrorClr')
    console.log(NotValidInput,"not valid input")
    if(!NotValidInput){
        console.log(ObjectForm,"objecform")
        emailverification.email = ObjectForm.email.element.value.trim();
        console.log(emailverification,"email verification")
        return true
    }else{
        return false
    }
}