import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services';

@Component({
    selector: 'product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

    products: any [] = [];

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.getProducts();
    }

    getProducts() {
        this.productService.getAllProduct().subscribe((data: any) => {
            this.products = data.sort((a: any, b: any) => parseFloat(b.id) - parseFloat(a.id));
        })
    }

}
