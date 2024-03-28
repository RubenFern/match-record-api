import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MaterialModules } from '../../../../../../material/material.modules';
import { Messages } from '../../../../../../lang/interfaces/messages.interface';
import { messagesApp } from '../../../../../../lang/messages_es';
import { CreateTeam, File } from '../../../../services/bowling/interfaces';
import { BowlingService } from '../../../../services/bowling/bowling.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-bowling-home-createYourTeam',
    standalone: true,
    imports: [
        MatButtonModule,
        ...MaterialModules,
        ReactiveFormsModule
    ],
    templateUrl: './create-your-team.component.html',
    styles: ``
})
export class CreateYourTeamComponent
{
    constructor(
        private bowlingService: BowlingService,
        private router: Router
    ) {}

    public messages: Messages = messagesApp;
    public file: File = { name: '', type: '', size: 0, lastModified: 0 };
    public previewImage: string = '';

    public createTeamForm = new FormGroup({
        name:               new FormControl<string>(''),
        ubication:          new FormControl<string>(''),
        image:              new FormControl<string>(''),
        foundationYear:     new FormControl<number>(new Date().getFullYear())
    });

    get currentCreateTeam(): CreateTeam
    {
        return this.createTeamForm.value as CreateTeam;
    }

    onCreateTeam(): void
    {
        this.bowlingService.createTeam(
            this.currentCreateTeam.name,
            this.currentCreateTeam.ubication,
            this.file.name,
            this.currentCreateTeam.foundationYear
        ).subscribe(result => {
            if (result)
                this.router.navigate(['/app/home']);
        });
    }

    onFileSelected(event: any): void
    {
        const upload = event.target.files[0];

        if (!upload.type.startsWith('image/'))
            return;

        this.file.name = upload.name;
        this.file.type = upload.type;
        this.file.size = upload.size;
        this.file.lastModified = upload.lastModified;

        const reader: FileReader = new FileReader();

        reader.readAsDataURL(upload);
        reader.onload = (event: any) => { this.previewImage = event.target.result; }
    }
}
