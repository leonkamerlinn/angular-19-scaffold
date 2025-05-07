import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { isDevMode } from '@angular/core';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startTime = Date.now();
  
  return next(req).pipe(
    tap({
      next: (event) => {
        if (isDevMode()) {
          const elapsedTime = Date.now() - startTime;
          console.log(`${req.method} ${req.url} completed in ${elapsedTime}ms`);
        }
      },
      error: (error) => {
        if (isDevMode()) {
          const elapsedTime = Date.now() - startTime;
          console.error(`${req.method} ${req.url} failed in ${elapsedTime}ms:`, error);
        }
      }
    })
  );
}; 