import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { sports } from '../sports';
import { Sport } from '../interfaces/sport.interface';
import { LayoutComponent } from '../../shared/layouts/home/layout/layout.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RouterModule,
        LayoutComponent
    ],
    templateUrl: './home.component.html',
    styles: ``
})
export class HomeComponent
{
    public sports: Sport[] = sports;
}
