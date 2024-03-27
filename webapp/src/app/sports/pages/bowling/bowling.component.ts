import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { isUserPlayerOfSport } from '../../helpers/validators';
import { CreatePlayerBowlingComponent } from '../../dialogs/create-player-bowling/create-player-bowling.component';

@Component({
  selector: 'app-bowling',
  standalone: true,
  imports: [],
  templateUrl: './bowling.component.html',
  styles: ``
})
export class BowlingComponent implements OnInit
{
    constructor(private dialog: MatDialog) {}

    ngOnInit(): void
    {
        if (!isUserPlayerOfSport("bowling"))
            this.openDialog();
    }

    private openDialog(): void
    {
        const dialogRef = this.dialog.open(CreatePlayerBowlingComponent);

        dialogRef.afterClosed().subscribe(result =>
            {
                console.log({ result });
            });
    }
}
