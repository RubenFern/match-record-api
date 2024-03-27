import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreatePlayerBowlingComponent } from '../../../dialogs/create-player-bowling/create-player-bowling.component';
import { BowlingService } from '../../../services/bowling/bowling.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-bowling-welcome',
    standalone: true,
    imports: [
        MatButtonModule,
    ],
    templateUrl: './welcome.component.html',
    styles: ``
})
export class WelcomeComponent
{
    constructor(
        private dialog: MatDialog,
        private bowlingService: BowlingService
    ) {}

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
