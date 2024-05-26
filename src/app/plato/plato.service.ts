import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Plato } from './plato';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  private apiURL = "http://127.0.0.1:8000/api/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }
  getAll(): Observable<Plato[]> {
    return this.httpClient.get<any>(this.apiURL + 'platos/')
      .pipe(
        catchError(this.errorHandler)
      );
  }
  
  


  create(plato: FormData): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + 'platos/', plato)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  

  find(id: number): Observable<Plato> {
    return this.httpClient.get<Plato>(this.apiURL + 'platos/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: number, post: Plato): Observable<Plato> {
    return this.httpClient.put<Plato>(this.apiURL + 'platos/' + id, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number) {
    return this.httpClient.delete<Plato>(this.apiURL + 'platos/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }


  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  
}