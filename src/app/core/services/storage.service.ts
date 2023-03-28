import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    public getCookie(key: string): any {
        return localStorage.getItem(key);
    }

    public setCookie(key: string, value: any): any {
        return localStorage.setItem(key, value);
    }

    public clearCookie(): any {
        return localStorage.clear();
    }

    public user() {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user.firstName + ' ' + user.lastName;
    }

}
