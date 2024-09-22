
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../books/book.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent {
   book:Partial<Book>={};

  constructor(private bookService: BookService, private router: Router) {}

  addBook(): void {
    if (this.isValidBook(this.book)) {
      this.bookService.addBook(this.book as Book).subscribe(
        (newBook) => {
          console.log('Book added:', newBook);
          this.router.navigate(['/books']);
        },
        (error) => {
          console.error('Error adding book:', error);
        }
      );
    } else {
      console.error('Invalid book details');
    }
  }
  
  private isValidBook(book: Partial<Book>): boolean {
    return !!(book.name && book.author && book.price !== undefined && book.price>0); // Convert to boolean
  }
}  