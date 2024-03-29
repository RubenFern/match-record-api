import { Component, OnInit } from '@angular/core';

import { BowlingService } from '../../services/bowling/bowling.service';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutComponent } from '../../../shared/layouts/sports/bowling/layout/layout.component';

@Component({
    selector: 'app-bowling',
    standalone: true,
    imports: [
        LayoutComponent,
        HomeComponent,
        WelcomeComponent,
        MatProgressSpinnerModule
    ],
    templateUrl: './bowling.component.html',
    styles: ``
})
export class BowlingComponent implements OnInit
{
    constructor(
        private bowlingService: BowlingService
    ) {}

    public showPage = false;
    public isLoading = true;

    ngOnInit(): void
    {
        this.bowlingService.isUserPlayer().subscribe(exists =>
        {
            this.showPage = exists;
            this.isLoading = false;
        });
    }
}
