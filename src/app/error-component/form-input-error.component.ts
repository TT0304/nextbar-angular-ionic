import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-form-input-error',
    templateUrl: './form-input-error.component.html'
})
export class FormInputErrorComponent {
    @Input() form: FormGroup;
    @Input() formInput: string;

    constructor(){
    }

    get formInputError() {

        if (this.form.controls[this.formInput]) {
            const errors = this.form.controls[this.formInput].errors;
            for (const errorName in errors) {

                if (errors[errorName]) {
                    switch (errorName) {
                        case 'required':
                            return 'Required';
                        case 'minlength':
                            return `Must be at least ${this.form.controls[this.formInput].errors.minlength.requiredLength} characters long.`;
                            case 'maxlength':
                                return `Cannot Exceed ${this.form.controls[this.formInput].errors.maxlength.requiredLength} characters long.`;
                            case 'email':
                            return 'Please enter an email address';
                            case 'validateAmount':
                            return 'Amount is not valid';
                        default:
                            return this.form.controls[this.formInput].errors[errorName];
                    }
                }
            }
            return null;
        }
    }
}
