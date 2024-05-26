import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Evento } from './evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private apiURL = "http://127.0.0.1:8000/api/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Evento[]> {
    return this.httpClient.get<Evento[]>(this.apiURL + 'eventos/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAllByUser(): Observable<Evento[]> {
    return this.httpClient.get<Evento[]>(this.apiURL + 'mispeticiones/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  create(evento: FormData): Observable<any> {
    return this.httpClient.post<any>(this.apiURL + 'eventos/', evento)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  find(id: number): Observable<Evento> {
    return this.httpClient.get<Evento>(this.apiURL + 'eventos/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: number, evento: Evento): Observable<Evento> {
    return this.httpClient.put<Evento>(this.apiURL + 'eventos/' + id, JSON.stringify(evento), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: number) {
    return this.httpClient.delete<Evento>(this.apiURL + 'eventos/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  unirse(eventoId: number): Observable<Evento> {
    return this.httpClient.post<Evento>(this.apiURL + `eventos/unirse/${eventoId}`, {}, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  desapuntarse(eventoId: number): Observable<Evento> {
    return this.httpClient.post<Evento>(this.apiURL + `eventos/desapuntarse/${eventoId}`, {}, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  isUserInEvent(eventoId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(this.apiURL + `eventos/usuarioevento/${eventoId}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  isEventFull(eventoId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(this.apiURL + `eventos/eventolleno/${eventoId}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  /*getUsuariosApuntados(eventoId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiURL + `eventos/${eventoId}/usuarios`)
      .pipe(
        catchError(this.errorHandler)
      );
  }*/


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