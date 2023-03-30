import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GeneralService } from './general.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    protected apiURL ="http://localhost:3000";
    constructor(
        private http: HttpClient,
        private storageService: StorageService,
        private router: Router,
        private generalService: GeneralService
    ) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    login(): Observable<any> {
        return this.http.get(`${this.apiURL}/signup`)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    signUp(payload: any): Observable<any> {
        return this.http.post(`${this.apiURL}/signup`, payload , this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    updateProfile(payload: any, id: string): Observable<any> {
        return this.http.put(`${this.apiURL}/signup/${id}/`, payload, this.httpOptions)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    profile(): Observable<any> {
        return this.http.get(`${this.apiURL}/signup`)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    logout() {
        this.storageService.clearCookie();
        this.router.navigate(['/']);
    }

    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
            console.error(errorMessage);
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            console.error(errorMessage);
        }
        this.generalService.displayError(errorMessage);
        return throwError(errorMessage);
    }

}
