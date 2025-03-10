import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private backendUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

  zones: string[] = ["Comedor 1", "Comedor 2", "Barra"];
  selectedZone: string = "";
  tables: number[] = [1, 2, 3, 4, 5];
  selectedTable: number | null = null;

  foodOptions = [
    {name: "Hamburguesa", image: `${this.backendUrl}/images/hamburguesa.png`},
    {name: "Sushi", image: `${this.backendUrl}/images/sushi.png`},
    {name: "Ensalada", image: `${this.backendUrl}/images/ensalada.png`}
  ];

  drinkOptions = [
    {name: "Agua", image: `${this.backendUrl}/images/agua.png`},
    {name: "Refresco", image: `${this.backendUrl}/images/refresco.png`},
    {name: "Vino", image: `${this.backendUrl}/images/vino.png`}
  ];

  dessertOptions = [
    {name: "Tarta", image: `${this.backendUrl}/images/tarta.png`},
    {name: "Helado", image: `${this.backendUrl}/images/helado.png`},
    {name: "Flan", image: `${this.backendUrl}/images/flan.png`}
  ];

  availability: any = {}; // Disponibilidad cargada desde el JSON
  selectedItem: any = null;
  private refreshInterval: any; // Variable para almacenar el temporizador


  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.loadAvailability(); // Cargar la disponibilidad al iniciar el componente

    this.refreshInterval = setInterval(() => {
      this.loadAvailability();
    }, 5000); // 5000ms = 5 segundos

  }
  // Limpia el temporizador al destruir el componente
  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }


  loadAvailability(): void {
    this.http.get(`${this.backendUrl}/api/menu`).subscribe(
      (data: any) => {
        this.availability = data;
        console.log('Disponibilidad cargada:', this.availability); // Depuración
      },
      (error) => {
        console.error('Error cargando la disponibilidad desde menu.json:', error);
      }
    );
  }

  isAvailable(itemName: string): boolean {


    return this.availability[itemName] ?? false; // Si no lo encuentra, devuelve false
  }


  selectZone(zone: string): void {
    this.selectedZone = zone;
    this.selectedTable = zone === "Barra" ? null : this.tables[0];
  }

  selectItem(item: any): void {
    if (this.isAvailable(item.name) == true) {
      this.selectedItem = item;
    } else {
      alert('Este elemento no está disponible.');
    }
  }

  makeOrder(): void {
    if (!this.selectedZone) {
      alert("⚠️ Por favor, selecciona una zona.");
      return; // Detener ejecución si no se selecciona la zona
    }

    if (this.selectedZone !== "Barra" && !this.selectedTable) {
      alert("⚠️ Por favor, selecciona una mesa.");
      return; // Detener ejecución si no se selecciona la mesa
    }

    if (!this.selectedItem) {
      alert("⚠️ Por favor, selecciona un elemento (comida, bebida o postre).");
      return; // Detener ejecución si no se selecciona un ítem
    }

    // Recargar el JSON (menu disponible) desde el servidor antes de realizar el pedido
    this.http.get(`${this.backendUrl}/api/menu`).subscribe(
      (data: any) => {
        this.availability = data; // Actualiza la disponibilidad en tiempo real

        // Verificar disponibilidad del ítem seleccionado
        if (!this.isAvailable(this.selectedItem.name)) {
          alert("❌ Este elemento ya no está disponible.");
          location.reload(); // Recargar la página si el ítem ya no está disponible
          return; // IMPORTANTE: Asegura que el flujo no sigue adelante
        }

        // Si el ítem es válido y disponible, se realiza el pedido
        const order = {
          food: this.selectedItem.name,
          table: this.selectedTable,
          zone: this.selectedZone
        };

        // Enviar pedido al servidor
        this.http.post(`${this.backendUrl}/api/orders`, order).subscribe(
          response => {
            alert("✅ Pedido realizado con éxito.");

            // Actualizar la disponibilidad en el backend
            this.updateAvailability(this.selectedItem.name);
            location.reload(); // Recargar la página al terminar el pedido
          },
          error => {
            alert("❌ Error al realizar el pedido.");
            console.error(error);
          }
        );
      },
      error => {
        alert("❌ No se pudo cargar la disponibilidad del menú.");
        console.error("Error al recargar el JSON desde el servidor:", error);
        location.reload(); // Recargar si ocurrió un error crítico durante la recarga del JSON
      }
    );
  }

// Nueva función para actualizar la disponibilidad
  updateAvailability(itemName: string): void {
    // Realiza una solicitud PUT para actualizar la disponibilidad en el servidor
    this.http.put(`${this.backendUrl}/api/menu`, {item: itemName, available: false}).subscribe(
      response => {
        console.log(`✅ Disponibilidad actualizada: ${itemName} -> false`);
        // Refrescar la disponibilidad local
        this.availability[itemName] = false;
      },
      error => {
        console.error(`❌ Error al actualizar la disponibilidad: ${itemName}`, error);
      }
    );
  }

}
