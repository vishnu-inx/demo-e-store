import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/shared/utils/validation';
import { AuthService } from 'src/app/core/services';
import ShortUniqueId from 'short-unique-id';

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
    uid = new ShortUniqueId({ length: 5 });

    constructor(
        public formBuilder: FormBuilder,
        private router: Router,
        private auth: AuthService
    ) {
        this.signUpForm = this.formBuilder.group(
            {
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required]],
                confirmPassword: ['', Validators.required],
                gender: ['male'],
                fname: ['', [Validators.required]],
                lname: ['', [Validators.required]],
                address: ['', [Validators.required]],
                phone: ['', [Validators.required]],
            },
            {
                validators: [Validation.match('password', 'confirmPassword')],
            }
        );
    }

    ngOnInit(): void {}

    get getControl(): { [key: string]: AbstractControl } {
        return this.signUpForm.controls;
    }

    signUp() {
        this.submitted = true;
        if (this.signUpForm.invalid) {
            return;
        }

        const payload = {
            id: this.uid(),
            firstName: this.signUpForm.value.fname,
            lastName: this.signUpForm.value.lname,
            email: this.signUpForm.value.email,
            gender: this.signUpForm.value.gender,
            phone: this.signUpForm.value.phone,
            address: this.signUpForm.value.address,
            password: this.signUpForm.value.password
        }

        this.auth.signUp(payload).subscribe((res: any) => {
            this.signUpForm.reset();
            this.router.navigate(['/auth/login']);
        })

    }

}
