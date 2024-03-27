import { Component, OnInit } from '@angular/core';

import { BowlingService } from '../../services/bowling/bowling.service';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';

@Component({
    selector: 'app-bowling',
    standalone: true,
    imports: [
        HomeComponent,
        WelcomeComponent
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

    ngOnInit(): void
    {
        this.bowlingService.isUserPlayer().subscribe(exists => this.showPage = exists );
    }
}
