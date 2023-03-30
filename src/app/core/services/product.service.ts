import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) { }

    getAllProduct(): Observable<any> {
        return this.http.get(`http://localhost:3000/products`);
    }

    getProduct(id: any): Observable<any> {
        return this.http.get(`http://localhost:3000/products/${id}`);
    }

    searchProduct(search: any): Observable<any> {
        return this.http.get(`http://localhost:3000/products?q=${search}`);
    }

    getProductByCategory(category: any): Observable<any> {
        return this.http.get(`http://localhost:3000/products?category=${category}`);
    }


}
