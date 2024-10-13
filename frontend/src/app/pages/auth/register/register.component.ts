import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../../services/auth/register/register.service';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrl: './register.component.css'
})
export class RegisterComponent {

    public registerForm: FormGroup;
    public errorMessage: string = '';
    public loading: boolean = false;

    constructor(
        private fb: FormBuilder,
        private registerService: RegisterService,
        private toastService: ToastService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
            c_password: ['', [Validators.required]]
        }, { validators: this.passwordMatchValidator });
    }

    passwordMatchValidator(form: FormGroup) {
        return form.get('password')?.value === form.get('c_password')?.value ? null : { mismatch: true };
    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.loading = true;
            this.registerService.register(this.registerForm.value).subscribe(
                (response: any) => {
                    this.loading = false;
                    if (response.success) {
                        this.toastService.showSuccess(response.message);
                        setTimeout(() => {
                            this.router.navigate(['']);
                        }, 1800)
                    } else {
                        console.log('Erro ao cadastrar usuário.');
                        this.toastService.showError('Erro ao cadastrar usuário.');
                    }
                },
                error => {
                    this.loading = false;
                    this.errorMessage = error.error.message;
                }
            );

        }
    }
}
