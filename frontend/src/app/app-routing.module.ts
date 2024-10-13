import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { AuthGuard } from './auth.guard';

import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard/dashboard.component';
import { TransactionsComponent } from './pages/finance/transactions/transactions.component';
import { AddTransacoesComponent } from './pages/finance/add-transacoes/add-transacoes.component';
import { TransactionComponent } from './pages/finance/transaction/transaction.component';
import { EditTransactionComponent } from './pages/finance/edit-transaction/edit-transaction.component';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'transactions', component: TransactionsComponent, canActivate: [AuthGuard] },
            { path: 'add-transactions', component: AddTransacoesComponent, canActivate: [AuthGuard] },
            { path: 'transaction/:id', component: TransactionComponent, canActivate: [AuthGuard] },
            { path: 'edit/transaction/:id', component: EditTransactionComponent, canActivate: [AuthGuard] }
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
