import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { GeneralService } from './general.service';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    protected apiURL ="http://localhost:3000";
    constructor(
        private http: HttpClient,
        private generalService: GeneralService
        ) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    getAllProduct(): Observable<any> {
        return this.http.get(`${this.apiURL}/products`)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    getProduct(id: any): Observable<any> {
        return this.http.get(`${this.apiURL}/products/${id}`)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    searchProduct(search: any): Observable<any> {
        return this.http.get(`${this.apiURL}/products?q=${search}`)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
    }

    getProductByCategory(category: any): Observable<any> {
        return this.http.get(`${this.apiURL}/products?category=${category}`)
        .pipe(
            retry(1),
            catchError(this.handleError)
        )
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
