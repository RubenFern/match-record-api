import { Component } from '@angular/core';
import { sports } from '../sports';
import { Sport } from '../interfaces/sport.interface';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RouterModule
    ],
    templateUrl: './home.component.html',
    styles: ``
})
export class HomeComponent
{
    public sports: Sport[] = sports;
}
