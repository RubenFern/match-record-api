import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MaterialModules } from '../../../../material/material.modules';
import { AuthService } from '../../services/auth.service';
import { CreateUser, ErrorsSignUp } from '../../interfaces/user.interface';
import { ERROR_CONFIRMPASSWORD, ERROR_PASSWORD, ERROR_USERNAME, ERROR_EMAIL } from '../../../../lang/messages';
import { errors } from '../../../../lang/messages_es';

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
    public errorOnRegister:         string = '';
    public errorMessages:           ErrorsSignUp = errors;
    public errorUsername:           string = ERROR_USERNAME;
    public errorEmail:              string = ERROR_EMAIL;
    public errorPassword:           string = ERROR_PASSWORD;
    public errorConfirmPassword:    string = ERROR_CONFIRMPASSWORD;

    constructor(
        private authService: AuthService,
    ) {}

    public userForm = new FormGroup({
        name:               new FormControl<string>('prueba'),
        username:           new FormControl<string>('prueba'),
        email:              new FormControl<string>('p@email.com'),
        password:           new FormControl<string>('1234567890'),
        confirmPassword:    new FormControl<string>('1234567890')
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
        if (error === ERROR_USERNAME)
            this.userForm.controls.username.setErrors({ notMatched: true });
        else
            this.userForm.controls.username.setErrors(null);

        if (error === ERROR_EMAIL)
            this.userForm.controls.email.setErrors({ notMatched: true });
        else
            this.userForm.controls.email.setErrors(null);

        if (error === ERROR_PASSWORD)
            this.userForm.controls.password.setErrors({ notMatched: true });
        else
            this.userForm.controls.password.setErrors(null);

        if (error === ERROR_CONFIRMPASSWORD)
            this.userForm.controls.confirmPassword.setErrors({ notMatched: true });
        else
            this.userForm.controls.confirmPassword.setErrors(null);
    }
}
