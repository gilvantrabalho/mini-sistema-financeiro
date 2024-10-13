import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../services/auth/login/login.service';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {

    public loginForm: FormGroup;
    public loading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private loginService: LoginService,
        private toastService: ToastService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.loading = true;
            this.loginService.login(this.loginForm.value).subscribe(
                (response: any) => {
                    this.loading = false;
                    this.loginService.saveToken(response.token, response.user);
                    this.router.navigate(['/dashboard']);
                },
                (error: any) => {
                    this.toastService.showError(error.error.message);
                    this.loading = false;
                }
            )

        } else {
            console.log("Formulário inválido");
        }
    }
}
