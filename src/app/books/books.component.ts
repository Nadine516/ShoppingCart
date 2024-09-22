import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from './book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(
      (response) => {
        this.books = response.data; // Access the data property here
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  addBook(): void {
    this.router.navigate(['/addBook']);
  }

  deleteBook(bookId: string): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(bookId).subscribe(
        () => {
          this.books = this.books.filter(book => book._id !== bookId);
          console.log('Book deleted successfully');
        },
        (error) => {
          console.error('Error deleting book:', error);
        }
      );
    }
  }

  editBook(bookId: string): void {
    this.router.navigate(['/editBook'], { queryParams: { id: bookId } });
  }
} 