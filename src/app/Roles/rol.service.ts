import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { Rol } from "../interfaces/rol";
import { Globals } from "../globals";
  
@Injectable(
  {
    providedIn: 'root'
  }
)


export class RolService {

  constructor(private http: HttpClient, private globals : Globals){}

  private host: string = 'http://localhost:8090';

  getRoles(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.globals.vhost +  '/Api/rol').pipe(
      catchError(
        e => {
          console.error(e.error.mensaje);
          return throwError(e);
        }
      )
    ) 
  };


}