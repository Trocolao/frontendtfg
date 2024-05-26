import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

     

import {  Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

  

import { Resena } from './resena';

  

@Injectable({

  providedIn: 'root'

})

export class ResenaService {

  

  private apiURL = "http://127.0.0.1:8000/api/";

    

  /*------------------------------------------

  --------------------------------------------

  Http Header Options

  --------------------------------------------

  --------------------------------------------*/

  httpOptions = {

    headers: new HttpHeaders({

      'Content-Type': 'application/json'

    })

  }

   

  /*------------------------------------------

  --------------------------------------------

  Created constructor

  --------------------------------------------

  --------------------------------------------*/

  constructor(private httpClient: HttpClient) { }

    

  /**

   * Write code on Method

   *

   * @return response()

   */

  getAll(): Observable<Resena[]> {
    return this.httpClient.get<Resena[]>(this.apiURL + 'resenas/')
      .pipe(
        catchError(error => {
          console.error('Error al obtener las reseñas:', error);
          return throwError('Ocurrió un error al obtener las reseñas. Por favor, inténtalo de nuevo más tarde.');
        })
      );
  }

    

  /**

   * Write code on Method

   *

   * @return response()

   */

  create(resena: FormData): Observable<Resena> {
    //const headers = new HttpHeaders();
    //headers.append('Content-Type', 'multipart/form-data');
    //headers.append('Accept', 'application/json');

    return this.httpClient.post<Resena>(this.apiURL + 'resenas/', resena, )//{ headers: headers })
      .pipe(
        catchError(this.errorHandler)
      )
  }

    

  /**

   * Write code on Method

   *

   * @return response()

   */

  find(id:number): Observable<any> {

  

    return this.httpClient.get(this.apiURL + 'resenas/' + id)

  

    .pipe(

      catchError(this.errorHandler)

    )

  }

    

  /**

   * Write code on Method

   *

   * @return response()

   */

  update(id:number, resena:Resena): Observable<any> {

  

    return this.httpClient.put(this.apiURL + 'resenas/' + id, JSON.stringify(resena), this.httpOptions)

 

    .pipe( 

      catchError(this.errorHandler)

    )

  }

       

  /**

   * Write code on Method

   *

   * @return response()

   */

  delete(id:number){

    return this.httpClient.delete(this.apiURL + 'resenas/' + id, this.httpOptions)

  

    .pipe(

      catchError(this.errorHandler)

    )

  }

      

  /** 

   * Write code on Method

   *

   * @return response()

   */

  errorHandler(error:any) {

    let errorMessage = '';

    if(error.error instanceof ErrorEvent) {

      errorMessage = error.error.message;

    } else {

      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

    }

    return throwError(errorMessage);

 }

}
