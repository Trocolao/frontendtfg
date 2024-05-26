import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// User interface
export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
  role!:number;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }
  // User registration
  register(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/register', user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/login', user);
  }
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/me');
  }
  
  isAdmin(): Observable<boolean> {
    return this.http.get<{ is_admin: boolean }>('http://127.0.0.1:8000/api/isAdmin').pipe(
      map(response => response.is_admin)
    );
  }
  getIdUserLogged(): Observable<number> {
    return this.http.get<any>('http://127.0.0.1:8000/api/meId')
      .pipe(
        map((response: any) => {
          // Suponiendo que el ID del usuario se encuentra en la propiedad 'id' de la respuesta del servidor
          return response.id;
        })
      );
  }
}