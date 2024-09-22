import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductsComponent } from './products/products.component';
import { authGuard } from './auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { BooksComponent } from './books/books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { RegisterComponent } from './auth/register/register.component';
const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent,canActivate:[authGuard] },
      { path: 'products', component: ProductsComponent,canActivate:[authGuard]  },
      { path: 'about-us', component: AboutUsComponent,canActivate:[authGuard]  },
      { path: 'contact-us', component: ContactUsComponent,canActivate:[authGuard]  },
      { path: 'product/:id', component: ProductDetailsComponent,canActivate:[authGuard]  } ,
      { path: 'book', component: BooksComponent,canActivate:[authGuard]  },
      { path: 'bookDetail', component: BookDetailComponent },
      // { path: 'book/:id', component: BookDetailComponent},
      {path:'addBook',component:AddBookComponent,canActivate:[authGuard]},
      {path:'editBook/:id',component:EditBookComponent,canActivate:[authGuard]}
    ]
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




