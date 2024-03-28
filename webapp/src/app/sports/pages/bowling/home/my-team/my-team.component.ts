import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { BowlingService } from '../../../../services/bowling/bowling.service';
import { CreateYourTeamComponent } from '../create-your-team/create-your-team.component';

@Component({
    selector: 'app-bowling-home-myTeam',
    standalone: true,
    imports: [
        CreateYourTeamComponent,
        MatProgressSpinnerModule
    ],
    templateUrl: './my-team.component.html',
    styles: ``
})
export class MyTeamComponent implements OnInit
{
    constructor(
        private bowlingService: BowlingService
    ) {}

    public playerHasTeam: boolean = false;
    public isLoading = true;

    ngOnInit(): void
    {
        this.bowlingService.getTeam().subscribe(team =>
        {
            this.playerHasTeam = !!team;
            this.isLoading = false;
        });
    }
}
