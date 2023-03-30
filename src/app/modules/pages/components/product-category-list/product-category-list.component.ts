import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-product-category-list',
    templateUrl: './product-category-list.component.html',
    styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {
    products: any[] = [];
    categoryId: any;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.categoryId = this.route.snapshot.params['category'];
        this.getProductByCat(this.categoryId);
    }

    ngOnInit(): void {}

    getProductByCat(category: any) {
        this.productService.getProductByCategory(category).subscribe((res: any) => {
            this.products = res;
        })
    }

}
