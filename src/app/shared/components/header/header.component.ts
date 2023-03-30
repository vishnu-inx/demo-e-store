import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService, AuthService, ProductService, GeneralService } from 'src/app/core/services';

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
    searchResult: any;
    showSearchModel = false;
    searchKeyword: any;

    constructor(
        private generalService: GeneralService, 
        private productService: ProductService,
        public storageService: StorageService,
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnInit(): void {
    }

    closeSearchModel() {
        setTimeout(() => {
            this.showSearchModel = false;
        }, 150);
    }

    onSearch(val: any) {
        this.showSearchModel = false;
        this.productService.searchProduct(val).subscribe((res: any) => {
            this.showSearchModel = true;
            this.searchResult = res;
        })
    }

    refreshRoute() {
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
        this.searchKeyword = '';
    }

    logout() {
        this.authService.logout();
    }

}
