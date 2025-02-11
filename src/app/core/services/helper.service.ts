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

  getParamById(id: string): string | null {
    return this._activatedRoute.snapshot.paramMap.get(id);
  }

  async setQueryParam(
    paramName: string,
    defaultValue: string,
    queryParamsHandling: QueryParamsHandling = 'merge'
  ): Promise<void> {
    const queryParams: Params = {};
    queryParams[paramName] = defaultValue;
    await this.navigateRelative([], queryParams, queryParamsHandling);
  }

  async setQueryParams(queryParams: Params, queryParamsHandling: QueryParamsHandling = 'merge'): Promise<void> {
    await this.navigateRelative([], queryParams, queryParamsHandling);
  }

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

  async navigateTo(paths: (string | number)[]): Promise<boolean> {
    return await this._router.navigate(paths);
  }

  getQueryParam(queryParamName: string): string | null {
    return this._activatedRoute.snapshot.queryParamMap.get(queryParamName);
  }

  queryParams$<T>(): Observable<T> {
    return this._activatedRoute.queryParams as Observable<T>;
  }

  queryParam$(paramName: string): Observable<string> {
    return this._activatedRoute.queryParams.pipe(map((obj) => obj[paramName]));
  }
}
