import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
    { path:"", component: HomeComponent },
    { path: "add-product", component: ProductAddComponent },
    { path: "product/:id", component: ProductDetailsComponent },
    { path: "product-category/:category", component: ProductCategoryListComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
