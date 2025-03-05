import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/api'; // Ajusta la URL según tu backend

  constructor(private http: HttpClient) { }

  getNewOrder(): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/new_order`);
  }
}
