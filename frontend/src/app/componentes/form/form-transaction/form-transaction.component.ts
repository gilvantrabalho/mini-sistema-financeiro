import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITransaction } from '../../../interfaces/transaction.interface';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TransactionEnum } from '../../../enums/transaction.enum';

@Component({
    selector: 'app-form-transaction',
    templateUrl: './form-transaction.component.html',
    styleUrl: './form-transaction.component.css'
})
export class FormTransactionComponent {

    @Input() transaction: ITransaction = {
        type: '',
        value: 0,
        date: new Date,
        description: ''
    };

    @Output() formSubmit = new EventEmitter<ITransaction>();

    public formAddTransaction: FormGroup;
    public entradaEnum: number = TransactionEnum.ENTRADA;
    public saidaEnum: number = TransactionEnum.SAIDA;

    constructor(
        private fb: FormBuilder,
    ) {
        this.formAddTransaction = this.fb.group({
            type: ['', Validators.required],
            description: ['', Validators.required],
            value: ['', Validators.required],
            date: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.formAddTransaction.valid) {
            this.formSubmit.emit(this.formAddTransaction.value);
        }
    }
}
