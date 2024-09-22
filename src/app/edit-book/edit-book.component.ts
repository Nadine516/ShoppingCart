import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../books/book.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
})
export class EditBookComponent implements OnInit {
  book: Book | undefined;
  bookId: string | null = null;
  isLoading = false; 
  errorMessage: string | null = null; 

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.bookId = params['id'];
      console.log('Book ID:', this.bookId); 
      if (this.bookId) {
        this.fetchBookDetails(this.bookId);
      }
    });
  }
  
  fetchBookDetails(id: string): void {
    this.isLoading = true;
    this.bookService.getBookById(id).subscribe(
      (data) => {
        this.book = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching book details:', error);
        this.errorMessage = 'Failed to fetch book details. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  updateBook(): void {
    if (this.book && this.isValidBook(this.book)) {
      this.isLoading = true; 
      this.bookService.editBook(this.book._id, this.book).subscribe(
        (updatedBook) => {
          console.log('Book updated:', updatedBook);
          this.isLoading = false;
          this.router.navigate(['/books'], { queryParams: { updated: true } });
        },
        (error) => {
          console.error('Error updating book:', error);
          this.errorMessage = 'Failed to update the book. Please try again.';
          this.isLoading = false;
        }
      );
    } else {
      this.errorMessage = 'Invalid book details. Please check the form.';
    }
  }

  private isValidBook(book: Book): boolean {
    return !!(book.name && book.author && book.price !== undefined);
  }
}
