import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

import { Messages } from '../../../../lang/interfaces/messages.interface';
import { messagesApp } from '../../../../lang/messages_es';

@Component({
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButton,
        MatDialogClose
    ],
    templateUrl: './create-player-bowling.component.html',
    styles: ``
})
export class CreatePlayerBowlingComponent
{
    constructor(
        private dialogRef: MatDialogRef<CreatePlayerBowlingComponent>
    ) {}

    public messages: Messages = messagesApp;

    onBack(): void
    {
        this.dialogRef.close(false);
    }

    onConfirm(): void
    {
        this.dialogRef.close(true);
    }
}
