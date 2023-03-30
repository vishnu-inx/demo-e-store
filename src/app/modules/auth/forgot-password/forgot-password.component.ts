import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import Validation from 'src/app/shared/utils/validation';
import { AuthService, GeneralService } from 'src/app/core/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
    changePasswordForm!: FormGroup;
    verifyEmailForm!: FormGroup;
    userProfileData: any;
    loading: boolean = false;
    validUser: boolean = false;
    isLoading: boolean = false;

    constructor(
        public formBuilder: FormBuilder,
        private authService: AuthService,
        private generalService : GeneralService,
        private router: Router
    ) { 
        this.userChangePassForm();
        this.verifyEmailForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        })
    }

    ngOnInit(): void {
    }

    get getControl(): { [key: string]: AbstractControl } {
        return this.verifyEmailForm.controls
    }

    async onSubmit() {
        if (this.verifyEmailForm.invalid) {
            this.verifyEmailForm.markAllAsTouched();
            return;
        }
        this.authService.profile().subscribe(async (res: any) => {
            this.userProfileData = await res.find((a: any) => {
                return a.email === this.verifyEmailForm.value.email
            });
            if (this.userProfileData) {
                this.verifyEmailForm.reset();
                this.validUser = true;
            } else {
                this.generalService.displayError(`User not found with this email ${this.verifyEmailForm.value.email}`);
            }
        });
    }

    userChangePassForm() {
        this.changePasswordForm = this.formBuilder.group(
            {
                newpassword: ['', [Validators.required]],
                confirmPassword: ['', Validators.required],
            },
            {
                validators: [Validation.match('newpassword', 'confirmPassword')],
            }
        );
    }

    get getChangePassControl(): { [key: string]: AbstractControl } {
        return this.changePasswordForm.controls
    }

    changePassword() {
        if (this.changePasswordForm.invalid) {
            this.changePasswordForm.markAllAsTouched();
            return;
        }
        const payload = {
            id: this.userProfileData.id,
            firstName: this.userProfileData.firstName,
            lastName: this.userProfileData.lastName,
            email: this.userProfileData.email,
            gender: this.userProfileData.gender,
            phone: this.userProfileData.phone,
            address: this.userProfileData.address,
            password: this.changePasswordForm.value.newpassword
        }
        this.authService.updateProfile(payload, this.userProfileData.id).subscribe((res: any) => {
            this.changePasswordForm.reset();
            this.generalService.displaySuccess('Password changed successfully.');
            this.router.navigate(['/auth/login']);
        });
    }

}
