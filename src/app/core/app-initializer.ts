import { HttpClient } from '@angular/common/http';

export function initializeAppFactory(http: HttpClient) {
  return (): Promise<HttpClient> => {
    return new Promise<HttpClient>((resolve) => {
      setTimeout(() => {
        resolve(http);
      }, 0);
    });
  };
}
