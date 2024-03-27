import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
    standalone: true,
    imports: [
        NavbarComponent,
        RouterModule
    ],
    templateUrl: './layout.component.html',
    styles: ``
})
export class LayoutComponent {

}
