import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Dispenser } from 'src/models/dispenser';
@Injectable({
  providedIn: 'root',
})
export class DispenserService {
  public url = 'http://localhost:5097/Beer';
  dispensers$: BehaviorSubject<Dispenser[]>;

  constructor(public http: HttpClient) {
    const initialDispensers: Dispenser[] = [];
    this.dispensers$ = new BehaviorSubject(initialDispensers);
  }

  getAllDispensers(url: string = this.url): Observable<Dispenser[]> {
    return this.http.get<Dispenser[]>(url).pipe(catchError(this.handleError));
  }

  manageDispenserStatus(item: Dispenser) {
    const updateUrl = `${this.url}/${item.id}`;
    return this.http
      .patch<Dispenser>(updateUrl, item)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => `${error.statusText}`);
  }
}
