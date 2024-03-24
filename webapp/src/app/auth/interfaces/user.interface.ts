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
    user: string;
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

export interface EmptyErrors
{
    name: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}
