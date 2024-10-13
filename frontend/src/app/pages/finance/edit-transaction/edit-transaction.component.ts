import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { ITransaction } from '../../../interfaces/transaction.interface';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';

@Component({
    selector: 'app-edit-transaction',
    templateUrl: './edit-transaction.component.html',
    styleUrl: './edit-transaction.component.css'
})
export class EditTransactionComponent {

    public isLoading: boolean = false;
    public transactionId: number = 0;
    public transaction: ITransaction = {
        type: 'string',
        value: 0,
        date: new Date,
        description: 'string'
    };

    constructor(
        private route: ActivatedRoute,
        private transactionService: TransactionService,
        private router: Router,
        private toastService: ToastService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.isLoading = true;
            this.transactionId = params['id'];
            this.transactionService.show(this.transactionId).subscribe(
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

    onSubmit(transactionData: any) {
        this.transactionService.update(this.transactionId, transactionData).subscribe(
            (response: any) => {
                if (response.success) {
                    this.toastService.showSuccess(response.message);
                    setTimeout(() => {
                        this.router.navigate(['transactions']);
                    }, 1500)
                } else {
                    console.log('Erro ao cadastrar usuário.');
                    this.toastService.showError('Erro ao cadastrar usuário.');
                }
            },
            (error: any) => {

            }
        );
    }

}
