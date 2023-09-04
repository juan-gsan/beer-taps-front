import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Dispenser } from 'src/models/dispenser';
import { DispenserUsage } from 'src/models/dispenser.usage';

@Injectable({
  providedIn: 'root',
})
export class UsageService {
  public url = 'http://localhost:5097/Usage';
  usage$: BehaviorSubject<DispenserUsage> =
    {} as BehaviorSubject<DispenserUsage>;

  constructor(public http: HttpClient) {
    const initialUsage: DispenserUsage = {} as DispenserUsage;
    this.usage$ = new BehaviorSubject(initialUsage);
  }

  openUsage(item: Dispenser): Observable<DispenserUsage> {
    const openUrl = `${this.url}/${item.id}`;
    return this.http
      .post<DispenserUsage>(openUrl, {})
      .pipe(catchError(this.handleError));
  }

  closeUsage(item: Dispenser) {
    const closeUrl = `${this.url}/${item.id}`;
    return this.http
      .patch<DispenserUsage>(closeUrl, {})
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => `${error.statusText}`);
  }
}
