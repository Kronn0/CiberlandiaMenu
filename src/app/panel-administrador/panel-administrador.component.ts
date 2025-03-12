import { Component, OnInit, OnDestroy } from '@angular/core';
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

interface MenuItem {
  name: string;
  available: boolean;
}

@Component({
  selector: 'app-panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.css']
})
export class PanelAdministradorComponent implements OnInit, OnDestroy {
  // Propiedades
  orders: Order[] = [];
  menuItems: MenuItem[] = [];
  private apiBase = `${window.location.protocol}//${window.location.hostname}:3000/api`;
  private refreshInterval: any; // Temporizador para actualizaciones automáticas

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadMenu();

    // Configurar la actualización automática del menú cada 5 segundos
    this.refreshInterval = setInterval(() => {
      this.loadMenu();
      this.loadOrders()// Recargar menú desde el servidor
    }, 1000);
  }

  // Limpia el temporizador al destruir el componente
  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  // Métodos para gestionar pedidos
  loadOrders() {
    this.http.get<Order[]>(`${this.apiBase}/orders`).subscribe((data) => {
      this.orders = data;
    });
  }

  markAsDelivered(order: Order) {
    if (!order.completed) {
      const updatedOrder = {
        completed: true,
        completedAt: new Date().toISOString()
      };

      console.log(`Enviando datos para pedido ${order.id}:`, updatedOrder); // Debug

      this.http.put(`${this.apiBase}/orders/${order.id}`, updatedOrder).subscribe(
        (response) => {
          console.log('Respuesta del servidor:', response); // Confirmación desde el servidor
          order.completed = updatedOrder.completed;
          order.completedAt = updatedOrder.completedAt;
          console.log(`Pedido ${order.id} actualizado exitosamente.`);
        },
        (error) => {
          console.error('Error al enviar la petición PUT:', error);
        }
      );
    }
  }
  deleteOrder(orderId: number): void {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este pedido?');
    if (confirmDelete) {
      this.http.delete(`${this.apiBase}/orders/${orderId}`).subscribe(
        () => {
          // Eliminamos el pedido de la lista local
          this.orders = this.orders.filter(order => order.id !== orderId);
          console.log(`Pedido con ID ${orderId} eliminado exitosamente.`);
        },
        (error) => {
          console.error(`Error al eliminar el pedido con ID ${orderId}:`, error);
        }
      );
    } else {
      console.log(`Eliminación del pedido con ID ${orderId} cancelada.`);
    }
  }


  toggleLocked(order: Order) {
    const updatedLocked = { locked: !order.locked };

    this.http.put(`${this.apiBase}/orders/${order.id}`, updatedLocked).subscribe(() => {
      order.locked = updatedLocked.locked;
    });
  }

  getTimeDifference(order: Order): string {
    if (!order.completedAt) return 'Pendiente';
    const start = new Date(order.orderDate).getTime();
    const end = new Date(order.completedAt).getTime();
    const diff = Math.abs(end - start) / (1000 * 60);
    return `${diff.toFixed(2)} min`;
  }



  // Métodos para gestionar menú
  loadMenu() {
    this.http.get<{ [key: string]: boolean }>(`${this.apiBase}/menu`).subscribe((data) => {
      this.menuItems = Object.keys(data).map((name) => ({
        name,
        available: data[name]
      }));
    });
  }

  toggleMenuItemAvailability(item: MenuItem) {
    const updatedAvailability = !item.available;

    this.http.put(`${this.apiBase}/menu/${item.name}`, { available: updatedAvailability }).subscribe(
      () => {
        item.available = updatedAvailability; // Actualiza visualmente al completar
      },
      (error) => {
        if (error.status === 404) {
          console.error(`Comida "${item.name}" no encontrada en el menú.`);
        } else {
          console.error('Error inesperado:', error);
        }
      }
    );
  }
}
