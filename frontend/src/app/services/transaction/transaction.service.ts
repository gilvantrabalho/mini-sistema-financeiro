import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITransaction } from '../../interfaces/transaction.interface';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    private baseUrl = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) { }

    list(type: string) {
        return this.http.get<any>(`${this.baseUrl}transaction${type ? `?type=${type}` : ''}`);
    }

    create(transaction: ITransaction) {
        return this.http.post<any>(`${this.baseUrl}transaction`, transaction);
    }

    delete(id: number) {
        return this.http.delete<any>(`${this.baseUrl}transaction/${id}`);
    }

    show(id: number) {
        return this.http.get<any>(`${this.baseUrl}transaction/${id}`);
    }

    update(id: number, transaction: ITransaction) {
        return this.http.put(`${this.baseUrl}transaction/${id}`, transaction);
    }
}
