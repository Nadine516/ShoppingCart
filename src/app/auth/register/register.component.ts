
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthService } from 'src/app/auth.service';
import { register } from './register.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const registerData: register = {
      first_name: this.registerForm.get('first_name')?.value,
      last_name: this.registerForm.get('last_name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        console.log('User registered successfully!', response);
        if (response.data.accessToken) {
          this.authService.saveToken(response.data.accessToken); 
        }

        this.router.navigate(['auth/login']); 
      },
      error: (error) => {
        console.log('Registration failed', error);
      },
      complete: () => {
        console.log('Registration process complete.');
      }
    });
  }
}


