

import { Rol } from "../interfaces/rol";
import { Tarea } from "./tarea";
export interface Persona {
  id: number;
  nombre: string;
  numeroIdentificacion: string;
  email: string;
  nickName: string;
  idRol: Rol;
  tareas: Tarea[];

}
