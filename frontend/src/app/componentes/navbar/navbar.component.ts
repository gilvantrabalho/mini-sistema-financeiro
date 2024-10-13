import { Component } from '@angular/core';
import { LoginService } from '../../services/auth/login/login.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

    constructor(
        private loginService: LoginService
    ) { }

    logout() {
        this.loginService.logout();
    }

}
