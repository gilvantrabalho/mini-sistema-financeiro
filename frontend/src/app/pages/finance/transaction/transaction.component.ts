import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { ITransaction } from '../../../interfaces/transaction.interface';
import { TransactionEnum } from '../../../enums/transaction.enum';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrl: './transaction.component.css'
})
export class TransactionComponent {

    public entradaEnum: any = TransactionEnum.ENTRADA;
    public saidaEnum: any = TransactionEnum.SAIDA
    public transaction: ITransaction = {
        type: 'string',
        value: 0,
        date: new Date,
        description: 'string'
    };
    public isLoading: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private transactionService: TransactionService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.isLoading = true;
            this.transactionService.show(params['id']).subscribe(
                (response: any) => {
                    this.transaction = response.transaction;
                    this.isLoading = false;
                },
                (error: any) => {
                    this.isLoading = false;
                }
            );
        });
    }

}
