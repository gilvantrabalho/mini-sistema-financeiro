import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ILogin } from '../../../interfaces/login.interface';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    private baseUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    login(data: ILogin) {
        return this.http.post<any>(`${this.baseUrl}auth/login`, data);
    }

    saveToken(token: string, user: any) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.router.navigate(['']);
    }
}
