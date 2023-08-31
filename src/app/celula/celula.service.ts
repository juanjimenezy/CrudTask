import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable,tap, throwError } from "rxjs";
import { Globals } from "../globals";
import { Celula } from "../interfaces/celula";
import { Utilidades } from "../Utilidades";


@Injectable(
  {
    providedIn: 'root'
  }
)
export class CelulaService {


  constructor(private http: HttpClient, private globals : Globals){}
  listar() {
    return this.http.get<any>(`${this.globals.vhost}/MScrudTask/celula/get/all`);
  }

  agregar(celula:Celula): Observable<Celula>{
    return this.http.post<any>(`${this.globals.vhost}/MScrudTask/celula`, (btoa(JSON.stringify(celula))));
  }

  actualizar(celula:Celula){
    return this.http.put<any>(`${this.globals.vhost}/MScrudTask/celula`,celula);
  }

  eliminar(id:any){
    return this.http.delete<any>(`${this.globals.vhost}/MScrudTask/celula/delete/${id}`);
  }
}
