import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Book } from './books/book.model';
import { environment } from 'src/assets/environment/environment';

interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = `${environment.apiBaseUrl}/api/book`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token ? token : ''}`,
    });
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong; please try again later.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    console.error('An error occurred:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
  

  getAllBooks(): Observable<ApiResponse<Book>> {
    return this.http.get<ApiResponse<Book>>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }


  getBookById(id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book, {
      headers: this.getAuthHeaders(),
    }).pipe(catchError(this.handleError));
  }

  editBook(bookId: string, updatedBook: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${bookId}`, updatedBook, {
      headers: this.getAuthHeaders(),
    }).pipe(catchError(this.handleError));
  }
  deleteBook(bookId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${bookId}`, {
      headers: this.getAuthHeaders(),
    }).pipe(catchError(this.handleError));
  }
}



