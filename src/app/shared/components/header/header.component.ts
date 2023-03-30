import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService, StorageService, AuthService, ProductService } from 'src/app/core/services';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    menuTitle: any = [
        {
            "title": "Home",
            "icon": "fa-solid fa-house",
            "link": "/home"
        },
        {
            "title": "Electronic",
            "icon": "fa-solid fa-mobile-screen-button",
            "link": "/home/product-category/Electronic"
        },
        {
            "title": "Other",
            "icon": "fa-solid fa-couch",
            "link": "/home/product-category/Other"
        }
    ];
    user: any;
    searchOutput: any;
    showDrop = false;
    model: any;

    constructor(
        private generalService: GeneralService,
        private productService: ProductService,
        public storageService: StorageService,
        private authService : AuthService,
        private router: Router,
    ) {

    }

    ngOnInit(): void {
    }

    dropClose() {
        setTimeout(() => {
            this.showDrop = false;
        }, 150);
    }

    searchP(val: any) {
        this.showDrop = false;
        this.searchOutput = ["das","da"];
        this.productService.searchProduct(val).subscribe((res: any) => {
            this.showDrop = true;
            this.searchOutput = res;
        })
    }

    refreshRoute() {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }

    logout() {
        this.authService.logout();
    }

}
