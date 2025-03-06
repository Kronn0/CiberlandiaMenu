import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  // Opciones de zonas y mesas
  zones: string[] = ["Comedor 1", "Comedor 2", "Barra"];
  selectedZone: string = "";

  tables: number[] = [1, 2, 3, 4, 5];
  selectedTable: number | null = null;

  // Opciones de comida, bebida y postres
  foodOptions: string[] = ["Hamburguesa", "Sushi", "Ensalada"];
  drinkOptions: string[] = ["Agua", "Refresco", "Vino"];
  dessertOptions: string[] = ["Tarta", "Helado", "Flan"];

  // Selección única del usuario
  selectedItem: string = "";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // Seleccionar zona y reiniciar mesa si es "Barra"
  selectZone(zone: string): void {
    this.selectedZone = zone;
    this.selectedTable = zone === "Barra" ? null : this.tables[0];
  }

  // Seleccionar comida, bebida o postre
  selectItem(item: string): void {
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
      food: this.selectedItem,
      table: this.selectedTable,
      zone: this.selectedZone,
      striked: false
    };

    this.http.post('http://localhost:3000/api/orders', order).subscribe(
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
