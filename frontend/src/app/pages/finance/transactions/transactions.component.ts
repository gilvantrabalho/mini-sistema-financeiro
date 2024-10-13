import { Component } from '@angular/core';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { TransactionEnum } from '../../../enums/transaction.enum';
import { ToastService } from '../../../services/toast.service';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.css'
})

export class TransactionsComponent {

    public transactions: any;
    public entradaEnum: number = TransactionEnum.ENTRADA
    public saidaEnum: number = TransactionEnum.SAIDA
    public page: number = 1;
    public isLoading: boolean = true;

    constructor(
        private transactionService: TransactionService,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
        this.loadTransactions();
    }

    loadTransactions(type: string = '') {
        this.isLoading = true;
        this.transactionService.list(type).subscribe(
            (response: any) => {
                this.transactions = response.transactions;
                this.isLoading = false;
            },
            (error: any) => {
                console.error('Erro ao carregar transações', error);
                this.isLoading = false;
            }
        );
    }

    confirmDelete(id: number) {
        const confirmed = confirm('Você tem certeza que deseja deletar esta transação?');
        if (confirmed) {
            console.log(id)
            this.transactionService.delete(id).subscribe(
                (response: any) => {
                    if (response.success) {
                        this.toastService.showSuccess(response.message);
                        this.loadTransactions();
                    } else {
                        this.toastService.showError(response.message);
                    }
                },
                (error: any) => {

                }
            )
        }
    }

    filterType(event: Event) {
        const target = event.target as HTMLSelectElement;
        const selectedValue = target.value;
        this.loadTransactions(selectedValue);
    }

}
