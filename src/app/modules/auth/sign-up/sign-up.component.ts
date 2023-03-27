import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/shared/utils/validation';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
    signUpForm!: FormGroup;
    submitted = false;
    isLoading = false;
    remarks = '';

    constructor(
        public formBuilder: FormBuilder,
        private router: Router,
    ) {
        this.signUpForm = this.formBuilder.group(
            {
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required]],
                confirmPassword: ['', Validators.required],
                gender: ['male'],
                fname: ['', [Validators.required]],
                lname: ['', [Validators.required]],
                street: ['', [Validators.required]],
                pincode: ['', [Validators.required]],
                city: ['', [Validators.required]],
                phone: ['', [Validators.required]],
            },
            {
                validators: [Validation.match('password', 'confirmPassword')],
            }
        );
    }

    ngOnInit(): void {
    }

    get getControl(): { [key: string]: AbstractControl } {
        return this.signUpForm.controls;
    }

    signUp() {
        this.submitted = true;
        if (this.signUpForm.invalid) {
            return;
        }

        const payload = {
            firstName: this.signUpForm.value.fname,
            lastName: this.signUpForm.value.lname,
            email: this.signUpForm.value.email,
            gender: this.signUpForm.value.gender,
            phone: this.signUpForm.value.phone,
            address: this.signUpForm.value.street,
            city: this.signUpForm.value.city,
            pincode: this.signUpForm.value.pincode,
        }

        console.log(payload);

    }

}
