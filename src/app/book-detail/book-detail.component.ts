import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../books/book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  book: Book | undefined;
  isLoading = false; 
  errorMessage: string | null = null; 

  constructor(private bookService: BookService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams['id'];
    alert(id)
    if (id) {
      this.fetchBookDetails(id);
    }
  }

  fetchBookDetails(id: string): void {
    this.isLoading = true; 
    this.bookService.getBookById(id).subscribe(
      (book) => {
        this.book = book;
      console.log(' this.book', this.book);
      
        this.isLoading = false; 
      },
      (error) => {
        console.error('Error fetching book details:', error);
        this.errorMessage = 'Failed to fetch book details. Please try again later.';
        this.isLoading = false; 
      }
    );
  }
}




