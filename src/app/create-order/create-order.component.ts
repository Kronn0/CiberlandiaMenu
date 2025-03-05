import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Order } from '../order.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class CreateOrder {
  orders: Order[] = [];
  title='Ciberlandia';
  constructor(private orderService: OrderService) {
    this.orderService.orders$.subscribe(orders => {
      this.orders = orders;
    });
  }

  addNewOrder() {
    this.orderService.getNewOrder().subscribe(
      (newOrder: Order) => {
        this.orderService.addOrder(newOrder).subscribe(
          (addedOrder) => {
            this.orderService.updateOrders(addedOrder);
            console.log('Order added to backend');
          },
          error => console.error('Error adding order:', error)
        );
      },
      error => console.error('Error fetching order:', error)
    );
  }
}
