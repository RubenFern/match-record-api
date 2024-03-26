import { Component } from '@angular/core';
import { sports } from './sports';
import { Sport } from '../../interfaces/sport.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent
{
    public sports: Sport[] = sports;
}
