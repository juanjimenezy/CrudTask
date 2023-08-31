import { Component, OnInit } from '@angular/core';
import { Persona } from '../interfaces/persona';
import { Tarea } from '../interfaces/tarea';
import { Rol } from '../interfaces/rol';
import { PersonaService } from './persona.service';
import { RolService } from '../Roles/rol.service';
import { TareaService } from '../tarea/tarea.service';

import { Globals } from "../globals";
import { MessageService } from 'primeng/api';
import jsonMsj from '../../../src/msg-es.json';


@Component({
  selector: 'app-personas',
  templateUrl: './persona.component.html'
})


export class PersonaComponent implements OnInit{
 
  constructor(private tareaService: TareaService,private personaService: PersonaService,
    private rolService: RolService,
    private globals: Globals,
    private messageService: MessageService) { }
  

 
  submitted: boolean;

  estados: string[];
  estado: string;
  vrating: number = 0;
  rangotareas: number = 0;
  personas: Persona[] = [];
  persona: Persona;
  roles: Rol[] = [];
  
  rol: Rol;
  personaDialog = false;
  personaDialogAC = false;

  products: Persona[];
  tareas: Tarea[] = [];
  tareastmp: Tarea[] = [];
  msgEs = jsonMsj.Tarea;
  ngOnInit() {
    
    this.traerPersonas();      
    this.traerTareas() ;
    console.log('get personas 2 ');
  };


  traerPersonas() {
    this.personaService.getPersonas().subscribe(
      (personas) => {
        console.log('personasnoko '+personas);
        this.personas = personas;         
      }, err => {
        console.log(err);
      }
    )
  };


  traerTareas() {
    this.tareaService.getTareas().subscribe(
      (tareas) => {        
        this.tareas = tareas;
        for (let i = 0; i < this.personas.length; i++) {
          this.rangotareas =0;
          for (let j = 0; j < this.tareas.length; j++) {
            if(this.tareas[j].persona.id == this.personas[i].id){
              this.tareastmp[this.rangotareas] = this.tareas[j];                        
              this.rangotareas ++;
            }                
          }
          this.personas[i].tareas  = this.tareastmp;
          this.tareastmp = [];
          this.rangotareas =0;
        }        
      }, err => {
        console.log(err);
      }
    );
  };


  abrirModal(persona) {
    if (!persona) {
      this.persona = {} as Persona;
    } else {
      
      this.persona = {
        id: persona.id,
        nombre: persona.nombre,
        numeroIdentificacion: persona.numeroIdentificacion,
        email: persona.email,
        idRol: persona.idRol,
        nickName: persona.nickName
      } as Persona;
    }
    this.personaDialog = true;
  };

  abrirModalAC(personas) {
    console.log('ac persona:: '+personas);
    this.rol = personas.idRol;
    
    if (!personas) {
      this.persona = {} as Persona;
    } else {
      
      this.persona = {
        id: personas.id,
        nombre: personas.nombre,
        numeroIdentificacion: personas.numeroIdentificacion,
        email: personas.email,
        idRol: personas.idRol,
        nickName: personas.nickName
      } as Persona;
    }
    this.personaDialogAC = true;
  };

  hideDialog() {
    this.personaDialog = false;

  };
  hideDialogAC() {
    this.personaDialogAC = false;

  };

  saveTarea() {
    this.submitted = true;
    if (!this.persona.id) {
      this.guardarTarea();
    } else {
      this.actualizarPersona();
    }

  };

  guardarTarea() {
    this.globals.progressBar = true;
    this.persona = this.persona;
    this.persona.idRol = this.rol;
  console.log('save data'+this.persona );
    if (this.validarDatosGuardar()) {
      this.personaService.createPersona(this.persona).subscribe(
        (persona) => {
          this.personas.push(persona);
          this.personaDialog = false;
          this.globals.progressBar = false;
          this.showAlert(this.msgEs.Alertas.success.severity, this.msgEs.Alertas.success.summary, this.msgEs.Alertas.success.detail);
        }, err => {
          console.log(err)
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

  actualizarPersona() {
    console.log('actualizarpersona  :: '+this.persona.nombre);
   /* this.tarea.estado = this.estado;
    this.tarea.porcentaje = this.vrating;
    console.log(this.vrating);
    console.log(this.tarea.porcentaje);*/
    this.globals.progressBar = true;
    this.persona.idRol = this.rol;
    if (this.validarDatosGuardar()) {
      this.personaService.actualizarPersona(this.persona).subscribe(
        (persona) => {
          
         //
         this.personas = this.personas.filter(t => t.id != persona.id);
         this.personas.push(this.persona);
         // this.globals.progressBar = false;
          this.personaDialogAC = false;
          this.globals.progressBar = false;
          //this.ngOnInit();
          this.showAlert(this.msgEs.Alertas.success.severity, this.msgEs.Alertas.success.summary, this.msgEs.Alertas.success.detail);
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

   deletePersona(id) {
    this.personaService.deletePersona(id).subscribe(
      (response) => {
        this.personas = this.personas.filter(t => t.id !== id);
        this.showAlert(this.msgEs.Alertas.success.severity, this.msgEs.Alertas.success.summary, this.msgEs.Alertas.success.detail);
      }
    );
   
    
  };

  traerRoles() {
    this.rolService.getRoles().subscribe(
      (roles) => {
        console.log('personas '+roles);
        this.roles = roles;
      }, err => {
        console.log(err);
      }
    )
  };

  ngAfterViewInit(): void {
  }


  validarDatosGuardar(): boolean {
  
    return true;
  }

  showAlert(tipoAlerta, titulo, mensaje) {
    this.messageService.add({ severity: tipoAlerta, summary: titulo, detail: mensaje });
  }

}
