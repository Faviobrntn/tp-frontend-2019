import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HabitacionesComponent } from './componentes/habitaciones/habitaciones.component';
import { DetallesComponent } from './componentes/detalles/detalles.component';

const routes: Routes = [
	{
		path: 'detalles/:id',
		component: DetallesComponent
	},
	{
		path: '*',
		component: HabitacionesComponent
	},
];

@NgModule({
  	imports: [RouterModule.forRoot(routes)],
  	exports: [RouterModule]
})
export class AppRoutingModule { }
