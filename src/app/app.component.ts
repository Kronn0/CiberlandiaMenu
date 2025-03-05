import { Component } from '@angular/core';
import { OrderService } from './order.service';
import { Order } from './order.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  addNewOrder() {
    this.orderService.getNewOrder().subscribe(
      (newOrder: Order) => {
        this.orders.push(newOrder);
      },
      error => {
        // Simulación en caso de no tener backend
        const foods = ['sushi', 'burger', 'sandwich'];
        const newOrder: Order = {
          food: foods[Math.floor(Math.random() * 3)],
          table: Math.floor(Math.random() * 3) + 1,
          zone: Math.floor(Math.random() * 2) + 1
        };
        this.orders.push(newOrder);
        console.error('Error fetching order, using mock data:', error);
      }
    );
  }
}
