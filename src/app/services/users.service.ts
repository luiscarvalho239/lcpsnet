import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Users } from '../classes/users';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = (environment.tApi == 'fake') ? environment.url_api_fake : environment.url_api_real;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<Users> {
    return this.http.get<Users>(`${this.url}/users`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getUsersMapped(): Observable<any> {
    return this.http.get<any>(`${this.url}/users`, httpOptions).pipe(
      map(r => {
        var myobj = [];
        for(var x = 0; x < r.length; x++) {
          myobj.push({
            id_user: r[x].id,
            username: r[x].username,
            image: r[x].image
          });
        }
        return myobj;
      }),
      catchError(this.handleError)
    );
  }

  getUsersById(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.url}/users/${id}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getUsernameByUserid(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/users?id=${id}`, httpOptions).pipe(
      map(r => r[0].username),
      catchError(this.handleError)
    );
  }

  getUserIdByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.url}/users?username=${username}`, httpOptions).pipe(
      map(r => r[0].id),
      catchError(this.handleError)
    );
  }

  createUsers(body: Users): Observable<Users> {
    return this.http.post<Users>(`${this.url}/users`, body, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updateUsers(id: number, body: Users): Observable<Users> {
    return this.http.put<Users>(`${this.url}/users/${id}`, body, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteUsers(): Observable<Users> {
    return this.http.delete<Users>(`${this.url}/users`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deleteUsersById(id: number): Observable<Users> {
    return this.http.delete<Users>(`${this.url}/users/${id}`, httpOptions).pipe(
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
