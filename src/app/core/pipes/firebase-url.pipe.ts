import { inject, Pipe, PipeTransform } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Pipe({
  name: 'firebaseUrl',
  standalone: true,
})
export class FirebaseUrlPipe implements PipeTransform {
  private _storage = inject(AngularFireStorage);

  transform(value: string): Observable<string> {
    return this.getUrl(value);
  }

  getUrl(path: string): Observable<string> {
    const ref = this._storage.ref(path);

    return ref.getDownloadURL();
  }
}
