import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { Product } from '../products/Product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit,OnDestroy {
  product:Product|undefined;
  private subscription!: Subscription;
  constructor(
    private productService:ProductsService,
    private route:ActivatedRoute
  ){}
  ngOnInit(): void {
    const prodID=+this.route.snapshot.paramMap.get('id')!;
    const observer = {
      next: (data: Product) => {
        this.product = data;
      },
      error: (error: any) => {
        console.error('Failed to fetch product details', error);
      },
      complete: () => {
        console.log('Product details fetching complete');
      }
    };

    this.subscription.add(this.productService.getProductByID(prodID).subscribe(observer));
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
//   product: Product | undefined;
//   nextProductID: number | undefined;
//   previousProductID: number | undefined;

//   constructor(
//     private route: ActivatedRoute,
//     private productsService: ProductsService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.route.paramMap.subscribe(params => {
//       const productId = Number(params.get('id'));
//       this.product = this.productsService.getProductByID(productId);
//       this.nextProductID = this.productsService.getNextProductID(productId);
//       this.previousProductID = this.productsService.getPreviousProductID(productId);
//     });
//   }

//   goToProduct(id: number | undefined): void {
//     if (id !== undefined) {
//       this.router.navigate([`/product/${id}`]);
//     }
//   }

//   goBack(): void {
//     window.history.back();
//   }
// }

