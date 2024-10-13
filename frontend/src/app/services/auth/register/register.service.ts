import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../interfaces/user.interface';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private baseUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    register(data: IUser) {
        return this.http.post(`${this.baseUrl}user/create`, data);
    }

}
