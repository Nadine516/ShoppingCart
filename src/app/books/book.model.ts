// src/app/books/book.model.ts

export interface Category {
  _id: string;
  title: string;
  status: string;
}

export interface Book {
  _id: string;
  name: string;
  description?: string;
  author: string;
  price: number;
  image?: string;
  category?: Category;  // Optional category
  status?: string;      // Optional status
}

