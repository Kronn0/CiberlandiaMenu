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
  allImages: string[] = [];
  private refreshInterval: any;
  private backendUrl = `${window.location.protocol}//${window.location.hostname}:3000`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadImages();

    // Refrescar imágenes cada 10 segundos (opcional)
    this.refreshInterval = setInterval(() => {
      this.loadImages();
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  loadImages(): void {
    const leftImageNames = ['cabildo_ftv', 'cabildo_gc', 'cabildo_lz', 'ciberlandia_corto'];
    const rightImageNames = ['elder', 'itq', 'sergio_alonso'];

    this.leftImages = leftImageNames.map(name => this.getImageUrl(name));
    this.rightImages = rightImageNames.map(name => this.getImageUrl(name));

    // Duplicamos las imágenes para un efecto continuo
    this.allImages = [...this.leftImages, ...this.rightImages, ...this.leftImages, ...this.rightImages];
  }

  getImageUrl(imageName: string): string {
    return `${this.backendUrl}/images/${imageName}.png`;
  }
}
