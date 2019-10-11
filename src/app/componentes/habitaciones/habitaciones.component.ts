import { Component, OnInit, ɵConsole } from '@angular/core';
import { HabitacionesService } from '../../servicios/habitaciones.service';
import { NgForm } from '@angular/forms';
import { Habitaciones } from 'src/app/modelos/habitaciones';
import { Router } from '@angular/router';

declare var M: any;

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.css'],
  providers: [HabitacionesService]
})
export class HabitacionesComponent implements OnInit {

	habitaciones: Habitaciones[];

  	constructor(
		private router: Router,
		private habitacionesService: HabitacionesService
	) { }

  	ngOnInit() {
    	this.listado();
  	}

  	listado(){
    	this.habitacionesService.gethabitaciones()
    		.subscribe(res => {
				this.habitaciones = res as Habitaciones[];
			},err => {
				console.log(err);
				M.toast({ html: 'error' });
			});
	}


  	nuevo(form: NgForm){
    	if(form.value._id){
      		this.habitacionesService.putHabitacion(form.value)
       			.subscribe(res => {
          			this.resetForm(form);
					M.toast({html: 'Actualizado con éxito'})
					this.listado();
        		}, err => {
					console.log(err);
					M.toast({ html: 'error' });
				}
        	);
    	} else{
	      	this.habitacionesService.postHabitaciones(form.value)
        		.subscribe(res => {
					console.log(res);
					this.resetForm(form);
					M.toast({html: 'Guardado con éxito'})
					this.listado();
				}, err => {
					console.log(err);
					M.toast({ html: 'error' });
				});
    	}
  	}

  	get(habitacion: Habitaciones){
    	this.habitacionesService.selectedHabitacion = habitacion;
  	}
	  
	detalle(habitacion: Habitaciones) {
		this.router.navigate(['detalles', habitacion._id]);
	};

  	eliminar(_id: string){
		if(confirm('Estas seguro de que desea eliminar esta habitación?')){
			this.habitacionesService.deleteHabitacion(_id)
				.subscribe(res => {
					console.log(res);
					M.toast({html: 'Eliminado con éxito'})
					this.listado();
				}, err => {
					console.log(err);
					M.toast({ html: 'error' });
				}
			);
		}
  	}

	resetForm(form?: NgForm){
		if(form){
			form.reset();
			this.habitacionesService.selectedHabitacion = new Habitaciones();
			this.listado();
		}
	}


  	buscar(search) {
		this.habitacionesService.buscarHabitacion(search.value)
			.subscribe((res) => {				
				if(res[0]){
					this.habitaciones = res as Habitaciones[];
				}else{
					M.toast({html: 'Sin resultados'});
					this.listado();
				}
			}, err => {
				console.log(err);
				M.toast({html: 'error'});
			}
		);
 	}

}
