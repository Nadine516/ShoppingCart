import { Component,OnInit, OnDestroy  } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../categories/catlist.models';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent  implements OnInit,OnDestroy{
  Categories:Category[]=[];
  private subscription!: Subscription;
  constructor(private categoryService:CategoryService){}
  ngOnInit(): void {
    const observer = {
      next: (data: Category[]) => {
        this.Categories = data;
      },
      error: (error: any) => {
        console.error('Failed to fetch categories', error);
      },
      complete: () => {
        console.log('Category fetching complete');
      }
    };
    this.subscription.add(this.categoryService.getAllCategories().subscribe(observer)); 
  }
ngOnDestroy(): void {
  if(this.subscription){
    this.subscription.unsubscribe();
  }
}

}
