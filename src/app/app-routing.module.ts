import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa tus componentes
import { ComandasComponent } from './comandas/comandas.component';
import { MenuComponent } from './menu/menu.component';
import {PanelAdministradorComponent} from "./panel-administrador/panel-administrador.component";

// Configuración de rutas
const routes: Routes = [
  { path: '', redirectTo: '/comandas', pathMatch: 'full' }, // Redirección a /comandas por defecto
  { path: 'comandas', component: ComandasComponent }, // Página de comandas
  { path: 'menu', component: MenuComponent },         // Página de menú
  { path: 'panel-administrador', redirectTo: '/panel-administrador' }       ,      // Ruta comodín
  {path: 'panel-administrador', component: PanelAdministradorComponent} //ruta administrador
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
