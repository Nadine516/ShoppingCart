
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl=  `${environment.apiBaseUrl}/categories`;

  constructor(private http: HttpClient) {}
  
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
