import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
    {
        path: '', pathMatch: 'full', redirectTo: 'auth'
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'notfound',
        loadChildren: () => import('./modules/not-found/not-found.module').then(m => m.NotFoundModule),
    },
    {
        path: '**',
        redirectTo: 'notfound'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
