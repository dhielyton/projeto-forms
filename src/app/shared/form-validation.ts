import { FormControl } from '@angular/forms';
export class FormValidation {

    static cepValidation(control: FormControl) {
        const cep = control.value;
        if (cep && cep !== '') {
            var validaCep = /^[0-9]{8}$/;;
            return (validaCep.test(cep)) ? null:{ cepInvalido:true};
        }
        return null;
    }
}