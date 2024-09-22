import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/assets/environment/environment';
import { Login } from './auth/login/login.model';
import { register } from './auth/register/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiBaseUrl}/api/auth/`;

  constructor(private http: HttpClient) { }

  private getHttpOptions(): { headers: HttpHeaders } {
    const token = this.getToken();
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : ''
      })
    };
  }

  
  login(loginData: Login): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}login`, loginData);
  }

 
  register(registerData: register): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}register`, registerData);
  }

 
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }


  logout(): void {
    localStorage.removeItem('authToken');
  }

  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  
  protected getProtectedData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}protected-data`, this.getHttpOptions());
  }
}
