import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { Persona } from "../interfaces/persona";
import { Globals } from "../globals";

@Injectable(
  {
    providedIn: 'root'
  }
)


export class PersonaService {

  constructor(private http: HttpClient, private globals : Globals){}

  private host: string = 'http://localhost:8090';

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.globals.vhost +  '/personas').pipe(
      catchError(
        e => {
          console.error(e.error.mensaje);
          return throwError(e);
        }
      )
    )
  };


  createPersona(persona : Persona) : Observable<Persona> {
    return this.http.post<Persona>(`${this.globals.vhost + '/personas'}`,persona).pipe(
      catchError(e =>{
        console.error(e.error.mensaje);
        return  throwError(e);
      })
    );
  };

  actualizarPersona(persona : Persona) : Observable<Persona> {
    return this.http.put<Persona>(`${this.globals.vhost + '/personas/' + persona.id}`,persona).pipe(
      catchError(e => {
        console.error(e.error.mensaje)
        return throwError(e);
      })
    );
  };

  deletePersona(id: number) : Observable<any> {
    return this.http.delete(`${this.globals.vhost + '/personas/'}${id}`);
  };

 

}