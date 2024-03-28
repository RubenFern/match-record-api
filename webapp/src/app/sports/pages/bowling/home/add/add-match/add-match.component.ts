import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MaterialModules } from '../../../../../../../material/material.modules';
import { CreateMatch } from '../../../../../services/bowling/interfaces';
import { Messages } from '../../../../../../../lang/interfaces/messages.interface';
import { messagesApp } from '../../../../../../../lang/messages_es';
import { BowlingService } from '../../../../../services/bowling/bowling.service';

@Component({
    selector: 'app-bowling-add-match',
    standalone: true,
    imports: [
        ...MaterialModules,
        ReactiveFormsModule
    ],
    templateUrl: './add-match.component.html',
    styles: ``
})
export class AddMatchComponent implements OnInit
{
    private numThrows = 10;
    public matchForm = new FormGroup({});
    public messages: Messages = messagesApp;

    constructor(
        private readonly bowlingService: BowlingService
    ) {}

    ngOnInit(): void
    {
        for (let i = 1; i <= this.numThrows; i++)
            this.matchForm.addControl(`throw${ i.toString().padStart(2, '0') }`, new FormControl<number>(0));
    }

    get currentCreateMatch(): CreateMatch
    {
        return this.matchForm.value as CreateMatch;
    }

    onCreate(): void
    {

    }
}
