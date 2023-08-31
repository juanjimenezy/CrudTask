import { Component, OnInit } from '@angular/core';
import { Tarea } from '../interfaces/tarea';
import { trigger, state, style, transition, animate, } from '@angular/animations';
import { TareaService } from './tarea.service';

import { SubTarea } from '../interfaces/subTarea';
import { Persona } from '../interfaces/persona';
import { PersonaService } from '../persona/persona.service';
import { Globals } from '../globals';

import { MessageService } from 'primeng/api';
import { VarSubTarea } from '../subtarea/varSubtarea';
import { SubTareaService } from '../subtarea/subtarea.service';
import jsonMsj from '../../../src/msg-es.json';
@Component({
  selector: 'app-tareas',
  templateUrl: './tarea.component.html',
  animations: [
    trigger('rowExpansionTrigger', [
      state(
        'void',
        style({
          transform: 'translateX(-10%)',
          opacity: 0,
        })
      ),
      state(
        'active',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
    ]),
  ],
})

export class TareaComponent implements OnInit {
  tareas: Tarea[] = [];
  tarea: Tarea;
  tareaDialog = false;

  personas: Persona[] = [];
  persona: Persona;

  submitted: boolean;

  estados: string[];
  estado: string;
  vrating: number = 0;
  msgEs = jsonMsj.Tarea;
  constructor(private tareaService: TareaService,
    private subTareaService : SubTareaService,
    private varSubTarea : VarSubTarea,
    private personaService: PersonaService,
    private globals: Globals,
    private messageService: MessageService) { }

  ngOnInit() {
    this.traerTareas();
    this.traerPersonas();
  };

  traerTareas() {
    this.globals.sprinner = true;
    this.tareaService.getTareas().subscribe(
      (tareas) => {
        this.tareas = tareas;
        this.globals.sprinner = false;
      }, err => {
        console.log(err);
        this.globals.sprinner = false;
      }
    );
  };

  traerPersonas() {
    this.personaService.getPersonas().subscribe(
      (personas) => {
        this.personas = personas;
      }, err => {
        console.log(err);
      }
    )
  };

  abrirModalSubTarea(subTarea, pTarea){
    if(subTarea){
      this.varSubTarea.subtarea = subTarea;
    }else{
      
      this.varSubTarea.subtarea = {porcentaje: 1,estado: 'NUEVA', tarea: pTarea} as SubTarea;
    }
    
    this.varSubTarea.subTareaDialog = true;
  }

  abrirModal(tarea) {
    if (!tarea) {
      this.tarea = {} as Tarea;
    } else {
      this.persona = tarea.persona;
      this.estado = tarea.estado;
      this.vrating = tarea.porcentaje;
      this.tarea = {
        id: tarea.id,
        nombre: tarea.nombre,
        persona: tarea.persona,
        sprint: tarea.sprint,
        porcentaje: tarea.porcentaje,
        estado: tarea.estado,
        celula: tarea.celula
      } as Tarea;
    }
    this.tareaDialog = true;
  };

  hideDialog() {
    this.tareaDialog = false;
  };

  saveTarea() {
    this.submitted = true;
    if (!this.tarea.id) {
      this.guardarTarea();
    } else {
      this.actualizarTarea();
    }
  };

  guardarTarea() {
    this.globals.progressBar = true;
    this.tarea.persona = this.persona;
    this.tarea.estado = "NUEVA";
    if (this.validarDatosGuardar()) {
      this.tareaService.create(this.tarea).subscribe(
        (tarea) => {
          this.tareas.push(tarea);
          this.tareaDialog = false;
          this.globals.progressBar = false;
          this.showAlert(this.msgEs.Alertas.success.severity, this.msgEs.Alertas.success.summary, this.msgEs.Alertas.success.detail);
        }, err => {
          console.log(err)
          this.globals.progressBar = false;
          this.showAlert("warn", "Datos incompletos.", "Porfavor diligencie completamente el formulario");
        }
      ); 
    } else {
      this.showAlert("warn", "Datos incompletos.", "Porfavor diligencie completamente el formulario");
      this.globals.progressBar = false;
    }
  };

  actualizarTarea() {
    this.tarea.estado = this.estado;
    this.tarea.porcentaje = this.vrating;
    console.log(this.vrating);
    console.log(this.tarea.porcentaje);
    this.globals.progressBar = true;
    this.tarea.persona = this.persona;
    if (this.validarDatosGuardar()) {
      this.tareaService.actualizarTarea(this.tarea).subscribe(
        (tarea) => {
          this.tareas = this.tareas.filter(t => t.id != tarea.id);
          this.tareas.push(tarea);
          this.globals.progressBar = false;                  
          this.tareaDialog = false; 
          this.showAlert(this.msgEs.Alertas.success.severity, this.msgEs.Alertas.success.summary, this.msgEs.Alertas.success.detail);
        //  this.ngOnInit();
        }, err => {
          console.log(err);
          this.globals.progressBar = false;
          this.showAlert(this.msgEs.Alertas.requireds.severity, this.msgEs.Alertas.requireds.summary, this.msgEs.Alertas.requireds.detail);
        }
      );
    } else {
      this.showAlert("warn", "Datos incompletos.", "Porfavor diligencie completamente el formulario");
      this.globals.progressBar = false;
      this.showAlert(this.msgEs.Alertas.requireds.severity, this.msgEs.Alertas.requireds.summary, this.msgEs.Alertas.requireds.detail);
    }
  };

  deleteTarea(id) {
    this.tareaService.deleteTarea(id).subscribe(
      (response) => {
        this.tareas = this.tareas.filter(t => t.id !== id);
        this.showAlert(this.msgEs.Alertas.success.severity, this.msgEs.Alertas.success.summary, this.msgEs.Alertas.success.detail);
       // this.ngOnInit();
      }
    );
  };

  deleteSubTarea(id) {
    this.subTareaService.deleteSubTarea(id).subscribe(
      (response) => {
        console.log(response);
        this.traerTareas();
        this.showAlert(this.msgEs.Alertas.success.severity, this.msgEs.Alertas.success.summary, this.msgEs.Alertas.success.detail);
      }
    );
  }

  getEstados() {
    this.estados = ["NUEVA", "DESARROLLO", "TERMINADA"]
  }

  ngAfterViewInit(): void {
    this.globals.sprinner = false;
  }

  validarDatosGuardar(): boolean {
    if (!this.tarea.nombre) {
      return false;
    } else
      if (!this.tarea.persona) {
        return false;
      } else
        if (this.tarea.sprint < 1) {
          return false;
        }
    return true;
  }

  showAlert(tipoAlerta, titulo, mensaje) {
    this.messageService.add({ severity: tipoAlerta, summary: titulo, detail: mensaje });
  }

}