import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import Validation from 'src/app/shared/utils/validation';
import { StorageService, AuthService, GeneralService } from 'src/app/core/services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    profileForm!: FormGroup;
    changePasswordForm!: FormGroup;
    userProfileData: any;
    isLoading = false;
    loading = false;
    submitted = false;

    constructor(
        public formBuilder: FormBuilder,
        private storageService: StorageService,
        private authService: AuthService,
        private generalService : GeneralService,
        private router: Router
    ) {
        this.userProfileData = JSON.parse(this.storageService.getCookie('user'));
        this.userProfileForm();
        this.userChangePassForm();
        this.profileForm.patchValue({
            id: this.userProfileData?.id,
            email: this.userProfileData?.email,
            password: this.userProfileData.password,
            confirmPassword: this.userProfileData.password,
            gender: this.userProfileData?.gender,
            fname: this.userProfileData.firstName,
            lname: this.userProfileData.lastName,
            address: this.userProfileData?.address,
            phone: this.userProfileData.phone,
        });
    }

    ngOnInit(): void {}

    userChangePassForm() {
        this.changePasswordForm = this.formBuilder.group(
            {
                oldpassword: ['', [Validators.required]],
                newpassword: ['', [Validators.required]],
                confirmPassword: ['', Validators.required],
            },
            {
                validators: [Validation.match('newpassword', 'confirmPassword')],
            }
        );
    }

    userProfileForm() {
        this.profileForm = this.formBuilder.group(
            {
                id: [''],
                email: ['', [Validators.required, Validators.email]],
                gender: ['male'],
                fname: ['', [Validators.required]],
                lname: ['', [Validators.required]],
                address: ['', [Validators.required]],
                phone: ['', [Validators.required]],
                password: ['']
            }
        );
    }

    get getControl(): { [key: string]: AbstractControl } {
        return this.profileForm.controls
    }

    get getChangePassControl(): { [key: string]: AbstractControl } {
        return this.changePasswordForm.controls
    }

    updateProfile() {
        if (this.profileForm.invalid) {
            this.profileForm.markAllAsTouched();
            return;
        }

        const payload = {
            id: this.profileForm.value.id,
            firstName: this.profileForm.value.fname,
            lastName: this.profileForm.value.lname,
            email: this.profileForm.value.email,
            gender: this.profileForm.value.gender,
            phone: this.profileForm.value.phone,
            address: this.profileForm.value.address,
            password: this.profileForm.value.password
        }

        this.authService.updateProfile(payload, this.profileForm.value.id).subscribe((res: any) => {
            this.storageService.setCookie('user', JSON.stringify(res));
            this.storageService.setCookie('isLogin', true);
            this.profileForm.reset();
            this.generalService.displaySuccess('Profile updated successfully.');
            this.router.navigate(['/home']);
        });
    }

    changePassword() {
        if (this.changePasswordForm.invalid) {
            this.changePasswordForm.markAllAsTouched();
            return;
        }

        if (this.userProfileData.password === this.changePasswordForm.value.oldpassword) {
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
                this.generalService.displaySuccess('Password updated successfully.');
                this.authService.logout();
            });
        } else {
            this.generalService.displayError("Old password is not correct!");
        }

    }

}
