import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Users } from '../classes/users';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = (environment.tApi == 'fake') ? environment.url_api_fake : environment.url_api_real;

  constructor(private http: HttpClient) { }

  login(): Observable<Users> {
    return this.http.get<Users>(`${this.url}`).pipe(
      catchError(this.handleError)
    );
  }

  register(objUsers: Users): Observable<Users> {
    return this.http.post<Users>(`${this.url}`, objUsers, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}
