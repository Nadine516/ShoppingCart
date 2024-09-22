
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Login } from './login.model';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get formControls(){
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData: Login = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: (response) => {
          console.log('Login successful!', response);
          this.authService.saveToken(JSON.stringify(response.data) );
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Login failed', error);
        },
        complete: () => {
          console.log('Login process complete.');
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
}






