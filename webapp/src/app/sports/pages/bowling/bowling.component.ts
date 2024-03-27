import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreatePlayerBowlingComponent } from '../../dialogs/create-player-bowling/create-player-bowling.component';
import { BowlingService } from '../../services/bowling/bowling.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-bowling',
    standalone: true,
    imports: [
        MatButtonModule
    ],
    templateUrl: './bowling.component.html',
    styles: ``
})
export class BowlingComponent implements OnInit
{
    constructor(
        private dialog: MatDialog,
        private bowlingService: BowlingService
    ) {}

    public showPage = false;

    ngOnInit(): void
    {
        this.bowlingService.isUserPlayer().subscribe(exists => this.showPage = exists );
    }

    openDialog(): void
    {
        const dialogRef = this.dialog.open(CreatePlayerBowlingComponent);

        dialogRef.afterClosed().subscribe(result =>
            {
                if (result)
                    this.bowlingService.createPlayer();
            });
    }
}
