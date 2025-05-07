import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Params, QueryParamsHandling, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class HelperService {
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _snackBar = inject(MatSnackBar);

  /* Routing */

  /**
   * Retrieves a route parameter by its ID
   * @param id The parameter ID to retrieve
   * @returns The parameter value or null if not found
   */
  getParamById(id: string): string | null {
    return this._activatedRoute.snapshot.paramMap.get(id);
  }

  /**
   * Sets a single query parameter with the specified value
   * @param paramName The parameter name to set
   * @param defaultValue The value to set for the parameter
   * @param queryParamsHandling How to handle existing query parameters
   */
  async setQueryParam(
    paramName: string,
    defaultValue: string,
    queryParamsHandling: QueryParamsHandling = 'merge'
  ): Promise<void> {
    const queryParams: Params = {};
    queryParams[paramName] = defaultValue;
    await this.navigateRelative([], queryParams, queryParamsHandling);
  }

  /**
   * Sets multiple query parameters at once
   * @param queryParams Object containing parameter names and values
   * @param queryParamsHandling How to handle existing query parameters
   */
  async setQueryParams(queryParams: Params, queryParamsHandling: QueryParamsHandling = 'merge'): Promise<void> {
    await this.navigateRelative([], queryParams, queryParamsHandling);
  }

  /**
   * Clears specific query parameters or all if none specified
   * @param paramNames Optional array of parameter names to clear
   * @returns Promise resolving to navigation success
   */
  async clearQueryParams(paramNames?: string[]): Promise<boolean> {
    if (!paramNames || paramNames.length === 0) {
      // Clear all query params
      return await this._router.navigate([], {
        relativeTo: this._activatedRoute,
        queryParams: {},
        queryParamsHandling: 'merge',
      });
    }
    
    // Clear only specified params
    const currentParams = { ...this._activatedRoute.snapshot.queryParams };
    paramNames.forEach(param => delete currentParams[param]);
    
    return await this._router.navigate([], {
      relativeTo: this._activatedRoute,
      queryParams: currentParams,
    });
  }

  /**
   * Navigates relative to the current route
   * @param path The path segments to navigate to
   * @param queryParams Optional query parameters to include
   * @param queryParamsHandling How to handle existing query parameters
   * @returns Promise resolving to navigation success
   */
  async navigateRelative(
    path: (string | number)[],
    queryParams: Params | null = null,
    queryParamsHandling: QueryParamsHandling = 'merge'
  ): Promise<boolean> {
    return await this._router.navigate(path, {
      relativeTo: this._activatedRoute,
      queryParams,
      queryParamsHandling,
    });
  }

  /**
   * Navigates to an absolute route
   * @param paths The path segments to navigate to
   * @returns Promise resolving to navigation success
   */
  async navigateTo(paths: (string | number)[]): Promise<boolean> {
    return await this._router.navigate(paths);
  }

  /**
   * Gets a query parameter value by name
   * @param queryParamName The parameter name to retrieve
   * @returns The parameter value or null if not found
   */
  getQueryParam(queryParamName: string): string | null {
    return this._activatedRoute.snapshot.queryParamMap.get(queryParamName);
  }

  /**
   * Returns an observable of all query parameters
   * @returns Observable of query parameters
   */
  queryParams$<T>(): Observable<T> {
    return this._activatedRoute.queryParams as Observable<T>;
  }

  /**
   * Returns an observable of a specific query parameter
   * @param paramName The parameter name to observe
   * @returns Observable of the parameter value
   */
  queryParam$(paramName: string): Observable<string> {
    return this._activatedRoute.queryParams.pipe(map((obj) => obj[paramName]));
  }

  /* Notifications */

  /**
   * Shows a snackbar message
   * @param message The message to display
   * @param action Optional action text
   * @param duration Duration in milliseconds (default: 3000)
   */
  showSnackbar(message: string, action: string = 'Close', duration: number = 3000): void {
    this._snackBar.open(message, action, {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  /**
   * Shows a success snackbar message
   * @param message The message to display
   * @param duration Duration in milliseconds (default: 3000)
   */
  showSuccess(message: string, duration: number = 3000): void {
    this._snackBar.open(message, 'OK', {
      duration,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  /**
   * Shows an error snackbar message
   * @param message The message to display
   * @param duration Duration in milliseconds (default: 5000)
   */
  showError(message: string, duration: number = 5000): void {
    this._snackBar.open(message, 'OK', {
      duration,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
