import { Component } from '@angular/core';

import { MaterialModules } from '../../../../../../material/material.modules';
import { Messages } from '../../../../../../lang/interfaces/messages.interface';
import { messagesApp } from '../../../../../../lang/messages_es';
import { AddMatchComponent } from './add-match/add-match.component';
import { AddEncounterComponent } from './add-encounter/add-encounter.component';
import { AddTournamentComponent } from './add-tournament/add-tournament.component';

@Component({
    selector: 'app-add',
    standalone: true,
    imports: [
        ...MaterialModules,
        AddMatchComponent,
        AddEncounterComponent,
        AddTournamentComponent
    ],
    templateUrl: './add.component.html',
    styles: ``
})
export class AddComponent
{
    public messages: Messages = messagesApp;
    public selected: string = messagesApp.selectBowlingAddMatch;

    changeForm(): void
    {
        console.log(this.selected);
    }
}
