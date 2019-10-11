import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HabitacionesService } from '../../servicios/habitaciones.service';
import { Habitaciones } from 'src/app/modelos/habitaciones';

@Component({
  selector: 'detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {

	entidad: any = new Habitaciones;

	constructor(
		private router: Router,
		private routerActivo: ActivatedRoute,
		private habitacionesService: HabitacionesService,
	) { }

	ngOnInit() {
		// this.routerActivo.params.subscribe((params) => this.id = params.id);
		this.routerActivo.params.subscribe((params) => {
			this.ver(params.id);
		});
	}

	ver(id){
		this.habitacionesService.get(id)
			.subscribe(res => {				
				this.entidad = res;
			}, err => {
				console.log(err);
			});
	};

	cerrar() {
		this.router.navigate(['/']);
	};

}
