import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  leftImages: string[] = [];
  rightImages: string[] = [];
  private refreshInterval: any;

  // URL dinámica para el backend
  private backendUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadImages();

    // Si necesitas refrescar las imágenes dinámicamente, puedes activar el intervalo
    this.refreshInterval = setInterval(() => {
      this.loadImages();
    }, 10000); // Por ejemplo, cada 10 segundos
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval); // Limpia el intervalo al destruir el componente
    }
  }

  // Método para cargar las imágenes desde el backend
  loadImages(): void {
    const leftImageNames = ['cabildo_ftv', 'cabildo_gc', 'cabildo_lz', 'ciberlandia_corto'];
    const rightImageNames = ['elder', 'itq', 'sergio_alonso'];

    // Generar URLs para las imágenes del lado izquierdo
    this.leftImages = leftImageNames.map(name => {
      const url = this.getImageUrl(name);
      console.log('Imagen izquierda URL:', url); // Debugging: Imprime la URL generada
      return url;
    });

    // Generar URLs para las imágenes del lado derecho
    this.rightImages = rightImageNames.map(name => {
      const url = this.getImageUrl(name);
      console.log('Imagen derecha URL:', url); // Debugging: Imprime la URL generada
      return url;
    });
  }


  // Método para construir dinámicamente la URL de las imágenes
  getImageUrl(imageName: string): string {
    return `${this.backendUrl}/images/${imageName}.png`;
  }
}
