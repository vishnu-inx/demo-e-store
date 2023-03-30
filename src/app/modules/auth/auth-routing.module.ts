import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoggedInAuthGuard } from 'src/app/core/guards/logged-in-auth.guard';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'login'},
    { path: 'login', component: LoginComponent, canActivate:[LoggedInAuthGuard] },
    { path: 'sign-up', component: SignUpComponent, canActivate:[LoggedInAuthGuard] },
    { path: 'profile', component: ProfileComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
