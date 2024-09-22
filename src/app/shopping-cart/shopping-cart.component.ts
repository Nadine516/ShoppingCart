
import { Component, OnInit,Input } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../products/Product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  @Input() Totalprice:any;
  products: Product[] = [];

  constructor(private productsService: ProductsService, private router: Router) {}

  ngOnInit(): void {
     this.productsService.getAllProducts().subscribe((res)=>{
      this.products =res
      console.log( 'this.products', this.products);
      
    });
  }

  viewDetails(productId: number): void {
    this.router.navigate([`/product/${productId}`]).then(() => {
      console.log(`Navigated to product ${productId} details`);
    });
  }
}
