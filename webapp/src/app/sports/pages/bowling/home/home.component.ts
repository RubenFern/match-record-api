import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModules } from '../../../../../material/material.modules';

@Component({
    selector: 'app-bowling-home',
    standalone: true,
    imports: [
        ...MaterialModules,
        RouterModule
    ],
    templateUrl: './home.component.html',
    styles: ``
})
export class HomeComponent
{

}
