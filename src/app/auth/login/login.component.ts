import { Component, signal, computed, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TranslocoModule } from '@jsverse/transloco';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    TranslocoModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  
  isSubmitting = signal(false);
  error = signal<string | null>(null);
  loginForm: FormGroup<LoginForm>;

  constructor() {
    this.loginForm = this.fb.group({
      email: this.fb.nonNullable.control('', [
        Validators.required, 
        Validators.email
      ]),
      password: this.fb.nonNullable.control('', [
        Validators.required,
        Validators.minLength(6)
      ])
    }) as FormGroup<LoginForm>;
  }

  // Use computed signals for better reactivity
  emailError = computed(() => {
    const email = this.loginForm.get('email');
    if (email?.hasError('required') && email?.touched) {
      return 'login.emailRequiredError';
    }
    if (email?.hasError('email') && email?.touched) {
      return 'login.emailFormatError';
    }
    return null;
  });

  passwordError = computed(() => {
    const password = this.loginForm.get('password');
    if (password?.hasError('required') && password?.touched) {
      return 'login.passwordRequiredError';
    }
    if (password?.hasError('minlength') && password?.touched) {
      return 'login.passwordMinLengthError';
    }
    return null;
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get emailRequiredError(): boolean {
    return !!(this.email?.hasError('required') && this.email?.touched);
  }

  get emailFormatError(): boolean {
    return !!(this.email?.hasError('email') && this.email?.touched);
  }

  get passwordRequiredError(): boolean {
    return !!(this.password?.hasError('required') && this.password?.touched);
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isSubmitting.set(true);
      this.error.set(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Login form submitted:', this.loginForm.value);
        // Handle successful login here
      } catch (err) {
        this.error.set('Login failed. Please try again.');
      } finally {
        this.isSubmitting.set(false);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
