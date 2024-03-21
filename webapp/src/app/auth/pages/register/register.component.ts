import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';
import { MaterialModules } from '../../../../material/material.modules';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        ...MaterialModules,
        RouterModule
    ],
    templateUrl: './register.component.html',
    styles: ``
})
export class RegisterComponent
{

}
