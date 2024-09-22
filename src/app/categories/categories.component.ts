import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Output() productChanged = new EventEmitter<number>();

  categories: { id: number, name: string }[] = [];
  selectedCategory: number | undefined;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data.map(category => ({
          id: category.id,
          name: category.name
        }));
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  onCategoryChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.productChanged.emit(+selectedValue);
  }
}
