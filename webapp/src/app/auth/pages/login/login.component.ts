import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { MaterialModules } from "../../../../material/material.modules";
import { EmptyErrorsSignIn, ErrorsSignIn, User } from '../../interfaces/user.interface';
import { AuthService } from "../../services/auth.service";
import { emptyErrorsSignIn, errorsSignIn } from '../../../../lang/messages_es';
import { ERROR_EMPTY_PASSWORD, ERROR_EMPTY_USERNAME, ERROR_LOGIN, ERROR_PASSWORD } from "../../../../lang/messages";

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
    public errorOnRegister:             string = '';
    public errorMessages:               ErrorsSignIn = errorsSignIn;
    public emptyErrors:                 EmptyErrorsSignIn = emptyErrorsSignIn;
    public errorUsername:               string = ERROR_LOGIN;
    public errorEmptyUsername:          boolean = false;
    public errorPassword:               string = ERROR_PASSWORD;
    public errorEmptyPassword:          boolean = false;

    constructor(
        private authService: AuthService,
    ) {}

    public userForm = new FormGroup({
        username:   new FormControl<string>(''),
        password:   new FormControl<string>('')
    });

    get currentUser(): User
    {
        return this.userForm.value as User;
    }

    public onLogin(): void
    {
        if (this.thereAreEmptyFields())
            return;

        this.authService.login(
            this.currentUser.username,
            this.currentUser.password
            )
            .subscribe( value =>
                {
                    console.log(value);
                    this.errorOnRegister = value

                    this.checkErrors(this.errorOnRegister);
                });
    }

    private checkErrors(error: string): void
    {
        if (error === ERROR_LOGIN ||error === ERROR_EMPTY_USERNAME)
            this.userForm.controls.username.setErrors({ notMatched: true });
        else
            this.userForm.controls.username.setErrors(null);

        if (error === ERROR_PASSWORD || error === ERROR_EMPTY_PASSWORD)
            this.userForm.controls.password.setErrors({ notMatched: true });
        else
            this.userForm.controls.password.setErrors(null);
    }

    private thereAreEmptyFields(): boolean
    {
        if (this.currentUser.username === '')
            this.errorEmptyUsername = true;
        else
            this.errorEmptyUsername = false;

        if (this.currentUser.password === '')
            this.errorEmptyPassword = true;
        else
            this.errorEmptyPassword = false;

        return this.errorEmptyUsername || this.errorEmptyPassword;
    }
}
