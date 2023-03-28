import { Component, OnInit } from '@angular/core';
import { GeneralService, StorageService, AuthService } from 'src/app/core/services';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    menuHeaders = ["home", "about-us", "contact-us"];
    user: any;

    constructor(
        private generalService: GeneralService,
        public storageService: StorageService,
        private authService : AuthService
    ) {

    }

    ngOnInit(): void {
    }

    logout() {
        this.authService.logout();
    }

}
