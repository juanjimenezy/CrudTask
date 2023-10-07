import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Celula } from '../interfaces/celula';
import { CelulaService } from './celula.service';
import { MessageService } from 'primeng/api';
import jsonMsj from '../../../src/msg-es.json';

@Component({
  selector: 'app-celula',
  templateUrl: './celula.component.html',
  styleUrls: ['./celula.component.css'],
  providers: [MessageService]
})

export class CelulaComponent implements OnInit {
  constructor(private celulaService: CelulaService, private messageService: MessageService) { }

  selectedDate: Date;
  selectedDate2: Date;
  lstCelulas: Celula[] = [];
  celula: Celula = null;
  celulaDialog: boolean = false;
  msgEs = jsonMsj.celula;
  totalRecords:number;
  ngOnInit(): void {
    this.getCelulas();
  }

  getCelulas() {
    this.celulaService.listar().subscribe({
      next: respuesta => {
        this.lstCelulas = respuesta;
        this.totalRecords = this.lstCelulas.length;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  send() {
    if (this.celula.id == null) {
      this.addCelula();
    } else {
      this.updateCelula(this.celula);
    }
  }

  addCelula() {
    if (this.celula.nombre == undefined && this.celula.nombre == null &&
      this.celula.productOwner == undefined && this.celula.productOwner == null &&
      this.celula.proyecto == undefined && this.celula.proyecto == null) {

      this.showAlert(this.msgEs.alertas.warn.severity, this.msgEs.alertas.warn.summary, this.msgEs.alertas.warn.detail);

    } else {
      this.celulaService.agregar(this.celula).subscribe({
        next: respuesta => {
          this.lstCelulas.push(respuesta);
          this.showAlert(this.msgEs.alertas.success.severity, this.msgEs.alertas.success.summary, this.msgEs.alertas.success.detail);
          this.celulaDialog = false;
        },
        error: (error: HttpErrorResponse) => {
          console.log("error: "+error.message);
          this.showAlert(this.msgEs.alertas.error.severity, this.msgEs.alertas.error.summary, this.msgEs.alertas.error.detailGuardar);
        }
      });
    }
  }

  updateCelula(celula?: Celula) {
    this.celulaService.actualizar(celula).subscribe({
      next: respuesta => {
        this.lstCelulas = this.lstCelulas.filter(obj => obj.id != celula.id);
        this.lstCelulas.push(respuesta);
        this.celulaDialog = false;
        this.showAlert(this.msgEs.alertas.success.severity, this.msgEs.alertas.success.summary, this.msgEs.alertas.success.detailUpdate);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 500) {
          this.showAlert(this.msgEs.alertas.error.severity, this.msgEs.alertas.error.summary, this.msgEs.alertas.error.detail);
        } else {
          this.showAlert(this.msgEs.alertas.error.severity, this.msgEs.alertas.error.summary, error.message);
        }
      }
    })
  }

  deleteCelula(id?: any) {
    this.celulaService.eliminar(id).subscribe({
      next: respuesta => {
        this.showAlert(this.msgEs.alertas.success.severity, this.msgEs.alertas.success.summary, this.msgEs.alertas.success.detailEliminar);
        this.lstCelulas = this.lstCelulas.filter(obj => obj.id != id);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status == 500) {
          this.showAlert(this.msgEs.alertas.error.severity, this.msgEs.alertas.error.summary, this.msgEs.alertas.error.detail);
        } else {
          this.showAlert(this.msgEs.alertas.error.severity, this.msgEs.alertas.error.summary, error.message);
        }
      }
    })
  }

  showModal(celula) {
    if (!celula) {
      this.celula = {} as Celula;
    } else {
      this.celula = {
        id: celula.id,
        nombre: celula.nombre,
        productOwner: celula.productOwner,
        proyecto: celula.proyecto
      } as Celula;
    }
    this.celulaDialog = true;
  }

  hideDialog() {
    this.celulaDialog = true;
  }

  showAlert(tipoAlerta, titulo, mensaje) {
    this.messageService.add({ severity: tipoAlerta, summary: titulo, detail: mensaje });
  }
}
