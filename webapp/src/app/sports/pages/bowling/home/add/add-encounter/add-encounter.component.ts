import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { messagesApp } from '../../../../../../../lang/messages_es';
import { Messages } from '../../../../../../../lang/interfaces/messages.interface';
import { MaterialModules, appDateFormat } from '../../../../../../../material/material.modules';
import { BowlingService } from '../../../../../services/bowling/bowling.service';
import { CreateEncounter } from '../../../../../services/bowling/interfaces';

@Component({
    selector: 'app-bowling-add-encounter',
    standalone: true,
    providers: [
        provideNativeDateAdapter(),
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: appDateFormat }
    ],
    imports: [
        ...MaterialModules,
        ReactiveFormsModule,
    ],
    templateUrl: './add-encounter.component.html',
    styles: ``
})
export class AddEncounterComponent
{
    public messages: Messages = messagesApp;
    public encounterForm = new FormGroup({
        name:               new FormControl<string>(''),
        description:        new FormControl<string>(''),
        date:               new FormControl<Date>(new Date())
    });

    constructor(
        private readonly bowlingService: BowlingService
    ) {}

    get currentCreateEncounter(): CreateEncounter
    {
        return this.encounterForm.value as CreateEncounter;
    }

    onCreate(): void
    {
        console.log(this.currentCreateEncounter);
        //this.bowlingService.createEncounter(this.currentCreateEncounter).subscribe();
    }
}
