import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    socialIconLink = {
        "whatsapp": "https://wa.me/1XXXXXXXXXX",
        "linkedin": "https://www.linkedin.com/signup",
        "instagram": "https://www.instagram.com/",
        "youtube": "https://www.youtube.com/"
    }

    constructor() { }

    ngOnInit(): void {
    }

}
