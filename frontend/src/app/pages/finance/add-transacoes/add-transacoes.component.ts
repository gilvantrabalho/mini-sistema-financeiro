import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { ToastService } from '../../../services/toast.service';
import { TransactionEnum } from '../../../enums/transaction.enum';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-transacoes',
    templateUrl: './add-transacoes.component.html',
    styleUrl: './add-transacoes.component.css'
})
export class AddTransacoesComponent {

    public formAddTransaction: FormGroup;
    public entradaEnum: number = TransactionEnum.ENTRADA;
    public saidaEnum: number = TransactionEnum.SAIDA;

    constructor(
        private fb: FormBuilder,
        private transactionService: TransactionService,
        private toastService: ToastService,
        private router: Router
    ) {
        this.formAddTransaction = this.fb.group({
            type: ['', Validators.required],
            description: ['', Validators.required],
            value: ['', Validators.required],
            date: ['', Validators.required]
        });
    }

    onSubmit(transactionData: any) {
        this.transactionService.create(transactionData).subscribe(
            (response: any) => {
                if (response.success) {
                    this.toastService.showSuccess(response.message);
                    this.router.navigate(['transactions']);
                } else {
                    this.toastService.showError(response.message);
                }
            },
            (error: any) => {
                console.log(error)
            }
        );
    }

}
