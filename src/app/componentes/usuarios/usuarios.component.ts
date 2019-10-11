import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Usuario } from 'src/app/modelos/usuario';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

	@Input() usuario: Usuario = {
		_id: '',
		nombre: '',
		email: ''
	};
	usuarios: Usuario[];

	constructor(
		private router: Router,
		private routerActivo: ActivatedRoute,
		private usuariosService: UsuariosService
	) { }


	ngOnInit() {
		this.listado();
	}


	resetForm(form?: NgForm){
		if (form) {
			form.reset();
		}
	}


	listado(){
		this.usuariosService.getAll()
			.subscribe(res => {
				console.log(res);
				this.usuarios = res as Usuario[];
			});
	}


	nuevo() {
		if (!this.usuario.nombre) { alert("Nombre vacio"); return; }
		if (!this.usuario.email) { alert("Email vacio"); return; }

		this.usuariosService.nuevo(this.usuario)
			.subscribe(res => {
				console.log(res);
				this.listado();
			});
		// this.router.navigate(['usuarios']);
	}

	nuevoSubmit(form: NgForm){
		console.log(form.value);
		this.usuariosService.nuevo(form.value)
			.subscribe(res => {
				console.log(res);
				this.resetForm(form);
				this.listado();
			});
	}


	eliminar(user: Usuario){
		if (confirm("Se va a eliminar "+user.nombre+". ¿Desea continuar?")) {
			this.usuariosService.eliminar(user._id)
				.subscribe(res => {
					console.log(res);
					this.listado();
					alert("Eliminado con éxito!");
				});
		}
	}

}
