import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

interface RegisterForm {
  fullName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isSubmitting = signal(false);
  registerForm: FormGroup<RegisterForm>;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      fullName: this.fb.nonNullable.control('', [Validators.required]),
      email: this.fb.nonNullable.control('', [Validators.required, Validators.email]),
      password: this.fb.nonNullable.control('', [Validators.required])
    }) as FormGroup<RegisterForm>;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isSubmitting.set(true);
      // Handle registration logic here
      console.log('Register form submitted:', this.registerForm.value);
      // Simulate API call
      setTimeout(() => this.isSubmitting.set(false), 1000);
    }
  }
}
