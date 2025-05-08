import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSubmitting = signal(false);
  loginForm: FormGroup<LoginForm>;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
      password: this.fb.nonNullable.control('', [Validators.required])
    }) as FormGroup<LoginForm>;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting.set(true);
      // Handle login logic here
      console.log('Login form submitted:', this.loginForm.value);
      // Simulate API call
      setTimeout(() => this.isSubmitting.set(false), 1000);
    }
  }
}
