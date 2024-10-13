import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DashboardLayoutComponent } from '../../layouts/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { NavbarComponent } from '../../componentes/navbar/navbar.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AddTransacoesComponent } from './add-transacoes/add-transacoes.component';
import { CardContainerComponent } from '../../componentes/card/card-container/card-container.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { CardDashboardComponent } from '../../componentes/card/card-dashboard/card-dashboard.component';
import { TransactionComponent } from './transaction/transaction.component';
import { EditTransactionComponent } from './edit-transaction/edit-transaction.component';
import { FormTransactionComponent } from '../../componentes/form/form-transaction/form-transaction.component';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        DashboardLayoutComponent,
        DashboardComponent,
        NavbarComponent,
        TransactionsComponent,
        AddTransacoesComponent,
        CardContainerComponent,
        CardDashboardComponent,
        TransactionComponent,
        EditTransactionComponent,
        FormTransactionComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        CurrencyMaskModule,
        NgxPaginationModule,
        NgxChartsModule,
        BrowserAnimationsModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'pt-BR' }
    ],
})
export class FinanceModule { }
