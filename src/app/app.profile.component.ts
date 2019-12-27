import {AppMainComponent} from './app.main.component';
import {Component} from '@angular/core';
import {trigger, state, transition, style, animate} from '@angular/animations';
import {UserLoggedService} from './demo/service/user-logged.service';

@Component({
    selector: 'app-inline-profile',
    template: `
        <!--div class="profile" [ngClass]="{'profile-expanded':active}">
            <a href="#" (click)="onClick($event)">
                <img class="profile-image" src="assets/layout/images/avatar.png" />
                <span class="profile-name">{{usuarioLoged}}</span>
                <i class="material-icons">keyboard_arrow_down</i>
            </a>
        </div-->

        <ul class="ultima-menu profile-menu" [@menu]="active ? 'visible' : 'hidden'">
            <!--li role="menuitem">
                <a href="#" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
                    <i class="material-icons">person</i>
                    <span>Profile</span>
                </a>
            </li>
            <li role="menuitem">
                <a href="#" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
                    <i class="material-icons">security</i>
                    <span>Privacy</span>
                </a>
            </li>
            <li role="menuitem">
                <a href="#" class="ripplelink" [attr.tabindex]="!active ? '-1' : null">
                    <i class="material-icons">settings_application</i>
                    <span>Settings</span>
                </a>
            </li>
            <li role="menuitem">
                <a href="#" class="ripplelink" [attr.tabindex]="!active ? '-1' : null" (click)="logOut()">
                    <i class="material-icons">power_settings_new</i>
                    <span>Logout</span>
                </a>
            </li-->
        </ul>
    `,
    animations: [
        trigger('menu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppInlineProfileComponent {

    active: boolean;
    usuarioLoged   = '';

    constructor(public app: AppMainComponent, private userLoggedService: UserLoggedService ) {
        this.usuarioLoged = this.userLoggedService.usuarioLogeado;
    }

    onInit() {
        this.usuarioLoged = this.userLoggedService.usuarioLogeado;
    }

    onClick(event) {
        this.active = !this.active;
        setTimeout(() => {
          this.app.layoutMenuScrollerViewChild.moveBar();
        }, 450);
        event.preventDefault();
    }

    logOut() {
        this.usuarioLoged = this.userLoggedService.usuarioLogeado = 'guest';
    }
}
