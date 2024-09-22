import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../products/Product.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit,OnDestroy{
  products:Product[]=[];
  private subscription!: Subscription;
  constructor(private productsService:ProductsService){}
  ngOnInit(): void {
    const categoryId=1;
  const observer={
    next:(data:Product[])=>{
      this.products=data;
    },
    error:(error:any)=>{
      console.error('Failed to fetch products',error)
    
    },
    complete:()=>{
      console.log("products fetching complete");
    }
  };
  this.subscription.add(this.productsService.getProductsByCategoryID(categoryId).subscribe(observer))
  }
  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    } 
  }

}
