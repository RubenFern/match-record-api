import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MaterialModules } from '../../../../../../material/material.modules';
import { Messages } from '../../../../../../lang/interfaces/messages.interface';
import { messagesApp } from '../../../../../../lang/messages_es';
import { File } from '../../../../services/bowling/interfaces';

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
    public messages: Messages = messagesApp;
    public file: File = { name: '', type: '', size: 0, lastModified: 0 };
    public previewImage: string = '';

    public createTeamForm = new FormGroup({
        name:               new FormControl<string>(''),
        ubication:          new FormControl<string>(''),
        image:              new FormControl<string>(''),
        foundationYear:     new FormControl<number>(new Date().getFullYear())
    });

    onCreateTeam(): void
    {

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
