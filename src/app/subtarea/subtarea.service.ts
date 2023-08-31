import { Injectable } from "@angular/core";
import { catchError, Observable,tap, throwError } from "rxjs";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { SubTarea } from "../interfaces/subTarea";
import { Globals } from "../globals";

@Injectable(
    {
        providedIn: 'root'
    }
)


export class SubTareaService {

    constructor(private http: HttpClient, private globals : Globals){}

    guardarSubTarea(subTarea : SubTarea, idTarea : number) : Observable<SubTarea>{
      return this.http.post<SubTarea>(`${this.globals.vhost + '/Api/subtarea/' + idTarea}`,subTarea).pipe(
        catchError(e => {
          console.error(e.error.mensaje)
          return throwError(e);
        })
      );
    };

    actualizarSubTarea(subTarea : SubTarea) : Observable<SubTarea> {
        return this.http.put<SubTarea>(`${this.globals.vhost + '/Api/subtarea/' + subTarea.id}`,subTarea).pipe(
          catchError(e => {
            console.error(e.error.mensaje)
            return throwError(e);
          })
        );
      };

      deleteSubTarea(id: number) : Observable<any> {
        return this.http.delete(`${this.globals.vhost + '/Api/subtarea/'}${id}`);
      };

}