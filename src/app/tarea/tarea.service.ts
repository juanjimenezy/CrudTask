import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable,tap, throwError } from "rxjs";
import { Globals } from "../globals";
import { Tarea } from "../interfaces/tarea";


@Injectable(
  {
    providedIn: 'root'
  }
)
export class TareaService {

  constructor(private http: HttpClient, private globals : Globals){}
  getTareas() : Observable<Tarea[]>{
    return this.http.get<Tarea[]>(this.globals.vhost + '/Api/task').pipe(
      catchError(
        e => {
          console.log(e.error.mensaje);
          return throwError(e);
        }
      )
    )
  };

  create(tarea : Tarea) : Observable<Tarea> {
    return this.http.post<Tarea>(`${this.globals.vhost + '/Api/task'}`,tarea).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        return  throwError(e);
      })
    );
  };

  actualizarTarea(tarea : Tarea) : Observable<Tarea> {
    return this.http.put<Tarea>(`${this.globals.vhost + '/Api/task/' + tarea.id}`,tarea).pipe(
      catchError(e => {
        console.error(e.error.mensaje)
        return throwError(e);
      })
    );
  };

  deleteTarea(id: number) : Observable<any> {
    return this.http.delete(`${this.globals.vhost + '/Api/task/'}${id}`);
  };

}
