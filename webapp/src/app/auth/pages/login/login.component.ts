import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

import { MaterialModules } from "../../../../material/material.modules";
import { User } from '../../interfaces/user.interface';
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ...MaterialModules,
        RouterModule,
        ReactiveFormsModule
    ],
    templateUrl: './login.component.html',
    styles: ``
})
export class LoginComponent
{
    constructor(
        private authService: AuthService,
    ) {}

    public userForm = new FormGroup({
        user:    new FormControl<string>(''),
        password:   new FormControl<string>('')
    });

    get currentUser(): User
    {
        return this.userForm.value as User;
    }

    public onLogin(): void
    {
        this.authService.login(this.currentUser.user, this.currentUser.password)
            .subscribe( /** router.navigate */ );
    }
}
