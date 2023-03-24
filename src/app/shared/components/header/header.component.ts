import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    menuHeaders = ["home", "about-us", "contact-us"];

    constructor() { }

    ngOnInit(): void {
    }

}
