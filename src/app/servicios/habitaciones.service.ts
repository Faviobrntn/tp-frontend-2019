import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Habitaciones } from '../modelos/habitaciones';
import { HabitacionesComponent } from '../componentes/habitaciones/habitaciones.component';

@Injectable({
  providedIn: 'root'
})
export class HabitacionesService {

  selectedHabitacion: Habitaciones;
  habitaciones: Habitaciones[];
  readonly URL_API = 'http://localhost:3000/api/habitaciones'

  constructor(private http: HttpClient) { 
    this.selectedHabitacion = new Habitaciones();
  }

  gethabitaciones(){
    return this.http.get(this.URL_API);
  }

  postHabitaciones(Habitaciones: Habitaciones){
    return this.http.post(this.URL_API, Habitaciones);
  }

  putHabitacion(habitacion: Habitaciones){
    return this.http.put(this.URL_API + `/${habitacion._id}`, habitacion);
  }

  deleteHabitacion(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }


  buscarHabitacion(search: string){
    return this.http.get(this.URL_API + `/search/${search}`);
  }

}
