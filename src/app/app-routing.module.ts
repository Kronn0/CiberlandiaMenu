import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa tus componentes
import { ComandasComponent } from './comandas/comandas.component';
import { MenuComponent } from './menu/menu.component';

// Configuración de rutas
const routes: Routes = [
  { path: '', redirectTo: '/comandas', pathMatch: 'full' }, // Redirección a /comandas por defecto
  { path: 'comandas', component: ComandasComponent }, // Página de comandas
  { path: 'menu', component: MenuComponent },         // Página de menú
  { path: '**', redirectTo: '/comandas' }             // Ruta comodín (404)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
