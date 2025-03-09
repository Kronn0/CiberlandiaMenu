import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Order {
  id: number;
  food: string;
  table: number;
  zone: string;
  orderDate: string;
  completed: boolean;
  completedAt: string | null;
  blocked: boolean;
}
@Component({
  selector: 'app-panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.css']
})
export class PanelAdministradorComponent implements OnInit {
  orders: Order[] = [];
  private backendUrl = `${window.location.protocol}//${window.location.hostname}:3000`;
  private apiUrl = `${window.location.protocol}//${window.location.hostname}:3000/api/orders`;
  private backendImageUrl = `${this.backendUrl}/images`;
  foods = [
    'Pizza',
    'Hamburguesa',
    'Ensalada',
    'Pasta',
    'Pasta con queso',
    'Pasta con tomate',
    'Pasta con queso y tomate',
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.http.get<Order[]>(this.apiUrl).subscribe(data => {
      this.orders = data.map(order => ({
        ...order,
        blocked: false // Estado inicial
      }));
    });
  }

  toggleCompleted(order: Order) {
    order.completed = !order.completed;
    order.completedAt = order.completed ? new Date().toISOString() : null;
    this.http.put(`${this.apiUrl}/${order.id}`, { completed: order.completed }).subscribe();
  }

  toggleBlocked(order: Order) {
    order.blocked = !order.blocked;
  }

  getTimeDifference(order: Order): string {
    if (!order.completedAt) return 'Pendiente';
    const start = new Date(order.orderDate).getTime();
    const end = new Date(order.completedAt).getTime();
    const diff = Math.abs(end - start) / 1000 / 60;
    return `${diff.toFixed(2)} min`;
  }
}
