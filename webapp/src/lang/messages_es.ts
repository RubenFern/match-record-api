import { Messages } from "./interfaces/messages.interface";

export const errorsSignUp = {
    'ERROR_USERNAME': 'Este nombre de usuario no está disponible',
    'ERROR_EMAIL': 'Esta dirección de correo ya existe',
    'ERROR_PASSWORD': 'La contraseña debe tener una longitud mínima de 8 caracteres',
    'ERROR_CONFIRMPASSWORD': 'Las contraseñas no coinciden',
};

export const errorsSignIn = {
    'ERROR_USERNAME': 'Nombre de usuario o contraseña incorrectos',
    'ERROR_PASSWORD': 'La contraseña debe tener una longitud mínima de 8 caracteres'
};

export const emptyErrorsSignUp = {
    'name': 'Debes añadir un nombre',
    'username': 'Debes añadir un nombre de usuario',
    'email': 'Debes añadir un email',
    'password': 'Debes añadir una contraseña',
    'confirmPassword': 'Debes confirmar la contraseña'
}

export const emptyErrorsSignIn = {
    'username': 'Debes especificar tu nombre de usuario',
    'password': 'Debes especificar tu contraseña'
}

export const messagesApp: Messages = {
    'createPlayerBowlingQuestion': '¿Quieres crear un perfil de jugador de Bowling?',
    'createPlayerBowlingInfo': 'No estás registrado como jugador de Bowling en la aplicación',
    'createPlayerBowlingBack': 'Volver',
    'createPlayerBowlingCreate': 'Crear',

    'navbarHome': 'Inicio',
    'navbarLogin': 'Iniciar sesión',
    'navbarRegister': 'Crear cuenta',
    'navbarLogout': 'Cerrar sesión',
    'navbarMyTeam': 'Mi Equipo',
    'navbarMatchs': 'Partidos',
    'navbarEncounters': 'Encuentros',
    'navbarTournaments': 'Torneos',

    'formCreateTeamTitle': 'Crea tu equipo',
    'formCreateTeamName': 'Nombre',
    'formCreateTeamImage': 'Seleccionar Imagen',
    'formCreateTeamUbication': 'Ubicación',
    'formCreateTeamFoundationYear': 'Año de fundación',
    'formCreateTeamTitleCreate': 'Crear',
}
