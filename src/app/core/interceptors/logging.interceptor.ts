import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { isDevMode } from '@angular/core';

export const loggingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>, 
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const startTime = Date.now();
  
  return next(req).pipe(
    tap({
      next: (event) => {
        if (isDevMode()) {
          const elapsedTime = Date.now() - startTime;
          console.log(`HTTP ${req.method} ${req.url} completed in ${elapsedTime}ms`);
        }
      },
      error: (error) => {
        if (isDevMode()) {
          const elapsedTime = Date.now() - startTime;
          console.error(`HTTP ${req.method} ${req.url} failed in ${elapsedTime}ms:`, error);
        }
      }
    })
  );
}; 