import { FormControl, FormGroup } from '@angular/forms';
export class FormValidation {

    static cepValidation(control: FormControl) {
        const cep = control.value;
        if (cep && cep !== '') {
            var validaCep = /^[0-9]{8}$/;;
            return (validaCep.test(cep)) ? null : { cepInvalido: true };
        }
        return null;
    }

    static equalsTo(otherField: string) {
        const validator = (formControl: FormControl) => {
            if (otherField == null) {
                throw new Error('É necessário informar um campo.')
            }
            if(!formControl.root ||!(<FormGroup>formControl.root).controls){
                return null;
            }
            const field = (<FormGroup>formControl.root).get(otherField);
            if (!field) {
                throw new Error('É necessário informar um campo válido.');
            }
            if(field.value !== formControl.value){
                return {equalsTo:otherField}
            }
            return null;
        };
        return validator;
    }

    static getErroMsg(fieldName:string, validatorName:string, validatorValue?:any){
        const config={
            'required':`${fieldName} é obrigatório.`,
            'minLength':`${fieldName} precisa ter no mínimo ${ validatorValue} caracteres.`,
            'cepInvalido':'CEP inválido.',
        }
        return config[validatorName];
    }
}