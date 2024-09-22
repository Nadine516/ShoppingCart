import { Injectable } from '@angular/core';
import { Product } from './products/Product.model';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environment/environment';
import { Category } from './categories/catlist.models';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 
  private apiUrl =`${environment.apiBaseUrl }+ '/api`;
 
 constructor(private http: HttpClient){ }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}products`);
  }
  getProductsByCategoryID(categoryId:number):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}products?categoryId=${categoryId}`);
  }
  getProductByID(productId: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}products/${productId}`);
  }
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}products`, product, httpOptions);
  }
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}categories`);
  }
}

  

