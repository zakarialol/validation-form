//import thing we need 
import {form ,ObjectForm} from "./state.js"
export function validFormInputsFunc(){
    console.log('hello we are inside the validation form')
     const formData = new FormData(form);
    let ObjectFormValues = Object.values(ObjectForm)
    const NotValidInput = ObjectFormValues.find(itm=>{
        return itm[Object.keys(itm)[0]] === false
    })
    NotValidInput?.element.scrollIntoView({
            behavior:"smooth",
            block:"center"
    })
    NotValidInput?.element.classList.add('box-ShadowErrorClr')
}