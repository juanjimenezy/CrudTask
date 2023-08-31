import { Component } from '@angular/core';
import { SubTareaService } from './subtarea.service';
import { VarSubTarea } from './varSubtarea';
import { Globals } from '../globals';
import { TareaComponent } from '../tarea/tarea.component';

@Component({
  selector: 'app-subtarea',
  templateUrl: './subtarea.component.html',
  
})
export class SubtareaComponent {
  estados: string[];

  constructor(public varSubtarea : VarSubTarea, 
    private subTareaService : SubTareaService,
    private tareaComponent : TareaComponent,
    private globals : Globals){};


  getEstados() {
    this.estados = ["NUEVA", "DESARROLLO", "TERMINADA"]
  }

  guardarSubTarea() {
    console.log(this.varSubtarea.subtarea);
    this.globals.progressBar = true;
    this.subTareaService.guardarSubTarea(this.varSubtarea.subtarea, this.varSubtarea.subtarea.tarea.id).subscribe(
      (subTarea) => {
        this.tareaComponent.traerTareas();
        this.globals.progressBar = false;
        this.hideDialogSubTarea();
      }, err => {
        console.log(err);
        this.globals.progressBar = false;
      }
    )
  }


  actualizarSubTarea() {
    this.globals.progressBar = true;
    this.subTareaService.actualizarSubTarea(this.varSubtarea.subtarea).subscribe(
      (subTarea) => {
        this.tareaComponent.traerTareas();
        this.globals.progressBar = false;
        this.hideDialogSubTarea();
      }, err => {
        console.log(err);
        this.globals.progressBar = false;
      }
    )
  }

  hideDialogSubTarea() {
    this.varSubtarea.subTareaDialog = false;
  }


  
}
