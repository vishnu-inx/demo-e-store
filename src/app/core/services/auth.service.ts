import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private http: HttpClient,
        private storageService: StorageService,
        private router: Router
    ) { }

    login(): Observable<any> {
        return this.http.get(`http://localhost:3000/signup`);
    }

    signUp(payload: any): Observable<any> {
        return this.http.post(`http://localhost:3000/signup`, payload);
    }

    updateProfile(payload: any, id: string): Observable<any> {
        return this.http.put(`http://localhost:3000/signup/${id}/`, payload);
    }

    logout() {
        this.storageService.clearCookie();
        this.router.navigate(['/']);
    }

}
