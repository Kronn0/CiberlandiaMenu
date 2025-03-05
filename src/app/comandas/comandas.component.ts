import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NgClass, NgForOf, NgIf} from "@angular/common";

interface Order {
  id: number;
  food: string;
  table: string;
  zone: string;
  striked: boolean;
}

@Component({
  selector: 'app-comandas',
  templateUrl: './comandas.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./comandas.component.css']
})
export class ComandasComponent implements OnInit {
  orders: Order[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  // Cargar pedidos desde el backend
  loadOrders(): void {
    this.http.get<Order[]>('http://localhost:3000/api/orders').subscribe(
      (data) => {
        this.orders = data;
      },
      (error) => {
        console.error('Error al cargar los pedidos:', error);
      }
    );
  }

  // Manejar el cambio de estado striked
  onCheck(index: number): void {
    const order = this.orders[index];
    if (order) {
      order.striked = !order.striked;

      // Mover al final si está marcado
      if (order.striked) {
        this.orders.push(...this.orders.splice(index, 1));
      }

      // Actualizar pedido en el backend
      this.updateOrder(order);
    }
  }

  // Actualizar el estado de striked en el backend
  updateOrder(order: Order): void {
    this.http
      .put(`http://localhost:3000/api/orders/${order.id}`, { striked: order.striked })
      .subscribe(
        (response) => {
          console.log('Pedido actualizado:', response);
        },
        (error) => {
          console.error('Error al actualizar el pedido:', error);
        }
      );
  }
}
