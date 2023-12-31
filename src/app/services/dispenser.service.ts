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
  dispenser$: BehaviorSubject<Dispenser>;

  constructor(public http: HttpClient) {
    const initialDispensers: Dispenser[] = [];
    const initialDispenser: Dispenser = {} as Dispenser;
    this.dispensers$ = new BehaviorSubject(initialDispensers);
    this.dispenser$ = new BehaviorSubject(initialDispenser);
  }

  getAllDispensers(url: string = this.url): Observable<Dispenser[]> {
    return this.http.get<Dispenser[]>(url).pipe(catchError(this.handleError));
  }

  getDispenserById(id: number): Observable<Dispenser> {
    const getByIdUrl = `${this.url}/${id}`;
    return this.http
      .get<Dispenser>(getByIdUrl)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(() => `${error.statusText}`);
  }
}
