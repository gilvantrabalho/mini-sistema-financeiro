import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-card-dashboard',
    templateUrl: './card-dashboard.component.html',
    styleUrl: './card-dashboard.component.css'
})
export class CardDashboardComponent {
    @Input() title: string = '';
    @Input() value: number = 0;
    @Input() icon: string = '';
}
