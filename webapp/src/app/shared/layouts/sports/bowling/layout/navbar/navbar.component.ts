import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MaterialModules } from "../../../../../../../material/material.modules";
import { Messages } from "../../../../../../../lang/interfaces/messages.interface";
import { messagesApp } from "../../../../../../../lang/messages_es";

@Component({
    selector: 'app-navbar-bowling',
    standalone: true,
    imports: [
        ...MaterialModules,
        RouterModule
    ],
    templateUrl: './navbar.component.html',
    styles: ``
})
export class NavbarComponent
{
    public messages: Messages = messagesApp;

    public showMenu(): void
    {
        const mobileMenu = document.getElementById("mobile-menu");

        if (mobileMenu?.classList.contains('hidden'))
            mobileMenu.classList.remove('hidden');
        else
            mobileMenu?.classList.add('hidden');
    }

    public showUserMenu(): void
    {
        const userMenu = document.getElementById("user-menu-options");

        if (userMenu?.classList.contains('hidden'))
            userMenu.classList.remove('hidden');
        else
            userMenu?.classList.add('hidden');
    }
}
