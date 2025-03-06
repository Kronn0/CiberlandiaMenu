import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  // URL dinámica para el backend basada en window.location
  private backendUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

  // Opciones de zonas y mesas
  zones: string[] = ["Comedor 1", "Comedor 2", "Barra"];
  selectedZone: string = "";

  tables: number[] = [1, 2, 3, 4, 5];
  selectedTable: number | null = null;

  // Opciones con imágenes desde el backend
  foodOptions = [
    { name: "Hamburguesa", image: `${this.backendUrl}/images/hamburguesa.png` },
    { name: "Sushi", image: `${this.backendUrl}/images/sushi.png` },
    { name: "Ensalada", image: `${this.backendUrl}/images/ensalada.png` }
  ];
  drinkOptions = [
    { name: "Agua", image: `${this.backendUrl}/images/agua.png` },
    { name: "Refresco", image: `${this.backendUrl}/images/refresco.png` },
    { name: "Vino", image: `${this.backendUrl}/images/vino.png` }
  ];
  dessertOptions = [
    { name: "Tarta", image: `${this.backendUrl}/images/tarta.png` },
    { name: "Helado", image: `${this.backendUrl}/images/helado.png` },
    { name: "Flan", image: `${this.backendUrl}/images/flan.png` }
  ];

  // Selección única del usuario
  selectedItem: any = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // Seleccionar zona y reiniciar mesa si es "Barra"
  selectZone(zone: string): void {
    this.selectedZone = zone;
    this.selectedTable = zone === "Barra" ? null : this.tables[0];
  }

  // Seleccionar comida, bebida o postre
  selectItem(item: any): void {
    this.selectedItem = item;
  }

  // Enviar pedido al backend
  makeOrder(): void {
    if (!this.selectedZone) {
      alert("⚠️ Por favor, selecciona una zona.");
      return;
    }

    if (this.selectedZone !== "Barra" && !this.selectedTable) {
      alert("⚠️ Por favor, selecciona una mesa.");
      return;
    }

    if (!this.selectedItem) {
      alert("⚠️ Por favor, selecciona un elemento (comida, bebida o postre).");
      return;
    }

    const order = {
      id: 0,
      food: this.selectedItem.name,
      foodImage: this.selectedItem.image, // Incluimos la imagen en el pedido
      table: this.selectedTable,
      zone: this.selectedZone,
      striked: false
    };

    this.http.post(`${this.backendUrl}/api/orders`, order).subscribe(
      response => {
        alert("✅ Pedido realizado con éxito");
        console.log("Pedido enviado:", response);
      },
      error => {
        alert("❌ Error al realizar el pedido, intenta de nuevo.");
        console.error("Error al realizar el pedido:", error);
      }
    );
  }
}
