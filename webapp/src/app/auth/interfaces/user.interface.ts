export interface CreateUser
{
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface User
{
    username: string;
    password:   string;
}

export interface Auth
{
    token: string,
    error: string
}

export interface ErrorsSignUp
{
    ERROR_USERNAME: string,
    ERROR_EMAIL: string,
    ERROR_PASSWORD: string,
    ERROR_CONFIRMPASSWORD: string
}

export interface ErrorsSignIn
{
    ERROR_USERNAME: string,
    ERROR_PASSWORD: string
}

export interface EmptyErrorsSignUp
{
    name: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

export interface EmptyErrorsSignIn
{
    username: string,
    password: string
}
