import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Posts } from '../classes/newsfeed';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {
  url = (environment.tApi == 'fake') ? environment.url_api_fake : environment.url_api_real;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Posts> {
    return this.http.get<Posts>(`${this.url}/posts`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getPostsById(id: number): Observable<Posts> {
    return this.http.get<Posts>(`${this.url}/posts/${id}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getPostsByUserId(id_user: number = -1): Observable<Posts> {
    const iduv = (id_user !== -1) ? `?id_user=${id_user}` : ``;
    return this.http.get<Posts>(`${this.url}/posts${iduv}`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  createPosts(body: Posts): Observable<Posts> {
    return this.http.post<Posts>(`${this.url}/posts`, body, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updatePosts(id: number, body: Posts): Observable<Posts> {
    return this.http.put<Posts>(`${this.url}/posts/${id}`, body, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deletePosts(): Observable<Posts> {
    return this.http.delete<Posts>(`${this.url}/posts`, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  deletePostsById(id: number): Observable<Posts> {
    return this.http.delete<Posts>(`${this.url}/posts/${id}`, httpOptions).pipe(
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
