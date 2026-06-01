//import thing we need 
import {form ,ObjectForm,emailverification} from "./state.js"
export function validFormInputsFunc(){
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
    if(!NotValidInput){
        emailverification.email = ObjectForm.email.element.value.trim();
        return true
    }else{
        return false
    }
}