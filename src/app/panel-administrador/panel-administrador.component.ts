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
  locked: boolean;
}

@Component({
  selector: 'app-panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.css']
})
export class PanelAdministradorComponent implements OnInit {
  orders: Order[] = [];
  apiUrl = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.http.get<Order[]>(this.apiUrl).subscribe(data => {
      this.orders = data;
    });
  }

  markAsDelivered(order: Order) {
    if (!order.completed) {
      order.completed = true;
      order.completedAt = new Date().toISOString();
      this.http.put(`${this.apiUrl}/${order.id}`, { completed: order.completed, completedAt: order.completedAt })
        .subscribe();
    }
  }

  toggleLocked(order: Order) {
    order.locked = !order.locked;
    this.http.put(`${this.apiUrl}/${order.id}`, { locked: order.locked })
      .subscribe();
  }

  getTimeDifference(order: Order): string {
    if (!order.completedAt) return 'Pendiente';
    const start = new Date(order.orderDate).getTime();
    const end = new Date(order.completedAt).getTime();
    const diff = Math.abs(end - start) / 1000 / 60;
    return `${diff.toFixed(2)} min`;
  }
}
