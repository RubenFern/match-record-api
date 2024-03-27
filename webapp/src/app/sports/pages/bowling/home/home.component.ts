import { Component, OnInit } from '@angular/core';
import { BowlingService } from '../../../services/bowling/bowling.service';
import { MyTeamComponent } from './my-team/my-team.component';

@Component({
    selector: 'app-bowling-home',
    standalone: true,
    imports: [
        MyTeamComponent
    ],
    templateUrl: './home.component.html',
    styles: ``
})
export class HomeComponent implements OnInit
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
