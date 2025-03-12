import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { ComandasComponent } from './comandas/comandas.component'; // Importa el módulo HTTP
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from "@angular/forms";
import { PanelAdministradorComponent } from './panel-administrador/panel-administrador.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    PanelAdministradorComponent,
    HeaderComponent,
    ComandasComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule, // Asegúrate de que esté incluido
    RouterModule,

    AppRoutingModule,
    FormsModule,

  ],
  providers: [],
  exports: [
    HeaderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
