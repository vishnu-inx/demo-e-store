import { Component, OnInit } from '@angular/core';
import { ProductService, StorageService } from 'src/app/core/services';

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

    products: any [] = [];
    show = 12;

    constructor(
        private productService: ProductService,
        public storageService: StorageService
        ) { }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        this.productService.getAllProduct().subscribe((data: any) => {
            this.products = data.sort((a: any, b: any) => parseFloat(b.id) - parseFloat(a.id));
        })
    }

    showMoreItems() {
        this.show += 12;
    }

}
