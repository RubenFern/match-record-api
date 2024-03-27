import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { CreatePlayerBowlingComponent } from '../../../dialogs/create-player-bowling/create-player-bowling.component';
import { BowlingService } from '../../../services/bowling/bowling.service';

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
        private bowlingService: BowlingService,
        private router: Router
    ) {}

    openDialog(): void
    {
        const dialogRef = this.dialog.open(CreatePlayerBowlingComponent);

        dialogRef.afterClosed().subscribe(async result =>
            {
                if (result)
                {
                    await this.bowlingService.createPlayer().subscribe();
                    this.router.navigate(['/app/home']);
                }
            });
    }
}
