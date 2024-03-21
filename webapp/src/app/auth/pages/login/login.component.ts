import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModules } from "../../../../material/material.modules";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        ...MaterialModules,
        RouterModule
    ],
    templateUrl: './login.component.html',
    styles: ``
})
export class LoginComponent
{

}
