import { Celula } from "../interfaces/celula";
import { Persona } from "../interfaces/persona";
import { SubTarea } from "../interfaces/subTarea";

export interface Tarea {

    id?: number;
    nombre: string;
    persona: Persona;
    sprint: number;
    porcentaje: number;
    estado: string;
    subTareas: SubTarea[];
    celula: Celula;
}
