import { Component } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

    public totalEntry: number = 0;
    public totalOut: number = 0;
    public total: number = 0;
    public data: { name: string, value: number }[] = [];

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    constructor(
        private dashboardService: DashboardService
    ) { }

    ngOnInit(): void {
        this.dataDashboard();
    }

    dataDashboard() {
        this.dashboardService.getDashboard().subscribe(
            (response: any) => {
                this.totalEntry = response.totalEntry;
                this.totalOut = response.totalOut;
                this.total = response.total;
                this.data = response.labels.map((label: string, index: number) => ({
                    name: label,
                    value: response.differences[index]
                }));
            },
            (error: any) => {

            }
        )
    }
}
