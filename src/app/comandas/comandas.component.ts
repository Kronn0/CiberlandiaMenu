import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class ComandasComponent implements OnInit, OnDestroy {
  orders: Order[] = [];
  private refreshInterval: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();

    // Configurar recarga automática cada 5 segundos
    this.refreshInterval = setInterval(() => {
      this.loadOrders(); // Recarga las órdenes periódicamente
    }, 5000); // Cada 5000 ms = 5 segundos
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval); // Limpia el intervalo cuando el componente se destruye
    }
  }

  // Cargar pedidos desde el backend (y ordenarlos según lógica requerida)
  loadOrders(): void {
    this.http.get<Order[]>('http://localhost:3000/api/orders')
      .subscribe(
        (data) => {
          // Ordenar por striked y luego por ID
          this.orders = data.sort((a, b) => {
            // Comparar primero por striked (false primero, true después)
            if (a.striked !== b.striked) {
              return a.striked ? 1 : -1;
            }
            // Si tienen el mismo estado striked, comparar por ID ascendente
            return a.id - b.id;
          });
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
      // Alternar el estado de striked
      order.striked = !order.striked;

      // Actualizar el pedido en el backend
      this.updateOrder(order);

      // Volver a ordenar la lista con la misma lógica
      this.orders.sort((a, b) => {
        // Comparar primero por striked
        if (a.striked !== b.striked) {
          return a.striked ? 1 : -1;
        }
        // Si tienen el mismo estado striked, comparar por ID
        return a.id - b.id;
      });
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
