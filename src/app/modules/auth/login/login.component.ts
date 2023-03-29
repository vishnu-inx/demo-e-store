import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, StorageService, GeneralService } from 'src/app/core/services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private router:Router,
        private storageService: StorageService,
        private generalService: GeneralService,
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
        });
    }

    ngOnInit(): void {
    }

    get f() {
        return this.loginForm.controls;
    }

    login() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }

        this.auth.login().subscribe(async (res: any) => {
            const user = await res.find((a: any) => {
                return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password
            });
            if (user) {
                this.storageService.setCookie('user', JSON.stringify(user));
                this.storageService.setCookie('isLogin', true);
                this.loginForm.reset();
                this.generalService.displaySuccess('Welcome ' + this.storageService.user());
                this.router.navigate(['/home']);
            } else {
                this.generalService.displayError('Email or Password is not correct!');
            }
        })
    }

}
