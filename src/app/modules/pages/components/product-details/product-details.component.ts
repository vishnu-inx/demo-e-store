import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-details',
    templateUrl: './product-details.component.html',
    styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

    id:any;
    productDetail: any;
    imageSrc: any;
    quantity = 1;

    constructor(
        private productService: ProductService,
        private route: ActivatedRoute
    ) {
        this.id = this.route.snapshot.params['id'];
    }

    ngOnInit(): void {
        this.getProduct();
        this.imageSrc = null;
    }

    getProduct() {
        this.productService.getProduct(this.id).subscribe((data: any) => {
            this.productDetail = data;
            this.imageSrc = data.thumbnail;
            console.log(this.productDetail);
        })
    }

    plus() {
        this.quantity = this.quantity + 1;
    }

    minus() {
        if (this.quantity > 1) {
            this.quantity = this.quantity - 1;
        }
    }

}
