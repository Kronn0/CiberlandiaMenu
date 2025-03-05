import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  // Zonas y mesas
  zones: string[] = ["Comedor 1", "Comedor 2", "Barra"];
  tables: number[] = [1, 2, 3, 4, 5];
  selectedZone: string = "";
  selectedTable: number | null = null;

  // Opciones de comida, bebida y postres
  foodOptions: string[] = ["Hamburguesa", "Sushi", "Ensalada"];
  drinkOptions: string[] = ["agua", "refresco", "vino"];
  dessertOptions: string[] = ["Tarta", "Helado", "Flan"];

  // Elecciones únicas
  selectedFood: string = "";
  selectedDrink: string = "";
  selectedDessert: string = "";

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  // Manejar el cambio de zona
  onZoneChange(): void {
    if (this.selectedZone === "Barra") {
      this.selectedTable = null; // Si es Barra, no hay mesas
    }
  }

  // Crear y enviar pedido al backend
  makeOrder(): void {
    // Validar que se haya seleccionado zona/mensaje y al menos una categoría
    if (!this.selectedZone || (!this.selectedTable && this.selectedZone !== "Barra")) {
      alert("Por favor selecciona una zona y una mesa.");
      return;
    }

    if (!this.selectedFood && !this.selectedDrink && !this.selectedDessert) {
      alert("Por favor selecciona al menos un alimento, una bebida o un postre.");
      return;
    }

    // Determinar el valor del campo 'food'
    const food = this.selectedFood || this.selectedDrink || this.selectedDessert;

    // Crear objeto del pedido en el formato y orden requerido
    const order = {
      id: 0, // El backend se encargará de asignar el ID correctamente
      food: food, // Valor único
      table: this.selectedTable || null,
      zone: this.selectedZone,
      striked: false
    };

    // Enviar el pedido al backend
    this.http.post('http://localhost:3000/api/orders', order).subscribe(
      (response) => {
        alert("Pedido realizado con éxito");
        console.log("Pedido enviado:", response);
      },
      (error) => {
        console.error("Error al realizar el pedido:", error);
      }
    );
  }
}
