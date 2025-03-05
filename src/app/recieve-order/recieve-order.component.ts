import { Component } from '@angular/core';
import {Order} from "../order.model";
import {OrderService} from "../order.service";

@Component({
  selector: 'app-recieve-order',
  templateUrl: './recieve-order.component.html',
  styleUrls: ['./recieve-order.component.css']
})
export class RecieveOrderComponent {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {
    this.orderService.orders$.subscribe(orders => {
      this.orders = orders;
    });
  }
  addNewOrder() {
    this.orderService.getNewOrder().subscribe(
      (newOrder: Order) => {
        this.orderService.addOrder(newOrder);
      },
      error => {
        const foods = ['sushi', 'burger', 'sandwich'];
        const newOrder: Order = {
          food: foods[Math.floor(Math.random() * 3)],
          table: Math.floor(Math.random() * 3) + 1,
          zone: Math.floor(Math.random() * 2) + 1
        };
        this.orderService.addOrder(newOrder);
        console.error('Error fetching order, using mock data:', error);
      }
    );
  }
}
