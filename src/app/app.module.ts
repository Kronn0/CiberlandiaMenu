import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { ComandasComponent } from './comandas/comandas.component'; // Importa el módulo HTTP
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Asegúrate de que esté incluido
    RouterModule,
    ComandasComponent,
    AppRoutingModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
