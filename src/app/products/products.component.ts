import { Component, OnInit } from '@angular/core';
import { ShoppingCartItem } from './shopping-cart-items.model';
import { ProductsService } from '../products.service';
import { Product } from './Product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  categ: number = 0;
  products: Product[] = [];
  filteredProducts: Product[] = []; 
  shoppingCartItems: ShoppingCartItem[] = [];
  totalPrice: number = 0;
  tax: number = 0;

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = this.products; 
      },
      (error) => {
        console.error('Error fetching products', error); 
        
      }
    );
  }

  onCategorySelected(categoryId: number): void {
    this.categ = categoryId;
    this.filteredProducts = this.products.filter(product => product.category === categoryId.toString()); 
  }

  updateQuantity(productId: number, change: number, quantityInput: HTMLInputElement): void {
    const product = this.filteredProducts.find(p => p._id === productId);
    if (product) {
      const newQuantity = parseInt(quantityInput.value, 10) + change;
      if (newQuantity > 0) {
        quantityInput.value = newQuantity.toString();
        this.handleCartItem({
          ID: product._id,
          Name: product.name,
          UnitPrice: product.price,
          SelectedQuantity: newQuantity
        });
      }
    }
  }

  handleCartItem(item: ShoppingCartItem): void {
    const existingItem = this.shoppingCartItems.find(cartItem => cartItem.ID === item.ID);
    if (existingItem) {
      existingItem.SelectedQuantity = item.SelectedQuantity;
    } else {
      this.shoppingCartItems.push(item);
    }
    this.updateTotals();
  }

  updateTotals(): void {
    this.totalPrice = this.shoppingCartItems.reduce((sum, item) => sum + (item.UnitPrice * item.SelectedQuantity), 0);
    this.tax = this.totalPrice * 0.14;
  }
}

