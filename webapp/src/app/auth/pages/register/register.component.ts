import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MaterialModules } from '../../../../material/material.modules';
import { AuthService } from '../../services/auth.service';
import { CreateUser, EmptyErrors, ErrorsSignUp } from '../../interfaces/user.interface';
import { ERROR_CONFIRMPASSWORD, ERROR_PASSWORD, ERROR_USERNAME, ERROR_EMAIL, ERROR_EMPTY_NAME, ERROR_EMPTY_USERNAME, ERROR_EMPTY_CONFIRMPASSWORD, ERROR_EMPTY_PASSWORD, ERROR_EMPTY_EMAIL } from '../../../../lang/messages';
import { emptyErrors, errors } from '../../../../lang/messages_es';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [
        ...MaterialModules,
        RouterModule,
        ReactiveFormsModule
    ],
    templateUrl: './register.component.html',
    styles: ``
})
export class RegisterComponent
{
    public errorOnRegister:             string = '';
    public errorMessages:               ErrorsSignUp = errors;
    public emptyErrors:                 EmptyErrors = emptyErrors;
    public errorEmptyName:              boolean = false;
    public errorUsername:               string = ERROR_USERNAME;
    public errorEmptyUsername:          boolean = false;
    public errorEmail:                  string = ERROR_EMAIL;
    public errorEmptyEmail:             boolean = false;
    public errorPassword:               string = ERROR_PASSWORD;
    public errorEmptyPassword:          boolean = false;
    public errorConfirmPassword:        string = ERROR_CONFIRMPASSWORD;
    public errorEmptyConfirmPassword:   boolean = false;

    constructor(
        private authService: AuthService,
    ) {}

    public userForm = new FormGroup({
        name:               new FormControl<string>(''),
        username:           new FormControl<string>(''),
        email:              new FormControl<string>(''),
        password:           new FormControl<string>(''),
        confirmPassword:    new FormControl<string>('')
    });

    get currentCreateUser(): CreateUser
    {
        return this.userForm.value as CreateUser;
    }

    public onRegister(): void
    {
        if ( this.currentCreateUser.password !== this.currentCreateUser.confirmPassword )
        {
            this.errorOnRegister = this.errorConfirmPassword;
            this.checkErrors(this.errorOnRegister);
            return;
        }

        if (this.thereAreEmptyFields())
            return;

        this.authService.register(
            this.currentCreateUser.name,
            this.currentCreateUser.username,
            this.currentCreateUser.email,
            this.currentCreateUser.password
            )
            .subscribe( value =>
                {
                    this.errorOnRegister = value

                    this.checkErrors(this.errorOnRegister);
                });
    }

    private checkErrors(error: string): void
    {
        if (error === ERROR_EMPTY_NAME)
            this.userForm.controls.name.setErrors({ notMatched: true });
        else
            this.userForm.controls.name.setErrors(null);

        if (error === ERROR_USERNAME || error === ERROR_EMPTY_USERNAME)
            this.userForm.controls.username.setErrors({ notMatched: true });
        else
            this.userForm.controls.username.setErrors(null);

        if (error === ERROR_EMAIL || error === ERROR_EMPTY_EMAIL)
            this.userForm.controls.email.setErrors({ notMatched: true });
        else
            this.userForm.controls.email.setErrors(null);

        if (error === ERROR_PASSWORD || error === ERROR_EMPTY_PASSWORD)
            this.userForm.controls.password.setErrors({ notMatched: true });
        else
            this.userForm.controls.password.setErrors(null);

        if (error === ERROR_CONFIRMPASSWORD || error === ERROR_EMPTY_CONFIRMPASSWORD)
            this.userForm.controls.confirmPassword.setErrors({ notMatched: true });
        else
            this.userForm.controls.confirmPassword.setErrors(null);
    }

    private thereAreEmptyFields(): boolean
    {
        if (this.currentCreateUser.name === '')
            this.errorEmptyName = true;
        else
            this.errorEmptyName = false;

        if (this.currentCreateUser.username === '')
            this.errorEmptyUsername = true;
        else
            this.errorEmptyUsername = false;

        if (this.currentCreateUser.email === '')
            this.errorEmptyEmail = true;
        else
            this.errorEmptyEmail = false;

        if (this.currentCreateUser.password === '')
            this.errorEmptyPassword = true;
        else
            this.errorEmptyPassword = false;

        if (this.currentCreateUser.confirmPassword === '')
            this.errorEmptyConfirmPassword = true;
        else
            this.errorEmptyConfirmPassword = false;

        return this.errorEmptyName || this.errorEmptyUsername || this.errorEmptyEmail || this.errorEmptyPassword || this.errorEmptyConfirmPassword;
    }
}
