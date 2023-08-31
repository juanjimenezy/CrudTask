import { Tarea } from "./tarea";

export interface SubTarea {
    id: number;
    nombre: string;
    horas: number;
    estado: string;
    porcentaje: number;
    tarea : Tarea;
}