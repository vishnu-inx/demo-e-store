import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';


@NgModule({
    declarations: [
        ProductListComponent,
        ProductAddComponent,
        ProductUpdateComponent,
        HomeComponent,
        ProductDetailsComponent,
        ProductCategoryListComponent,
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        NgbModule,
        NgbModule,
        FormsModule,
        NgxBootstrapIconsModule.pick(allIcons)
    ]
})
export class PagesModule { }
