import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Itempedido } from './itempedido';
import { Plato } from './plato';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = "http://127.0.0.1:8000/api/pedidos"; 
  constructor(private http: HttpClient) { }

  store(platos: Itempedido[]): Observable<any> {
    return this.http.post(this.apiUrl, { platos });
  }

  update(id: number, platos: Itempedido[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { platos });
  }

  destroy(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  index(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
  myindex(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mine`);
  }

  show(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  getPlatosPorPedido(id: number): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.apiUrl}/pedidos/${id}/platos`);
  }
}
