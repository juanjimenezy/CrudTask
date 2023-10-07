import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Globals } from '../globals';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public globals: Globals) { }

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      //{ label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['home'] },
      { label: 'Celulas', icon: 'pi pi-fw pi-slack', routerLink: ['celula'] },
      { label: 'Tareas', icon: 'pi pi-fw pi-pencil', routerLink: ['tareas'] },
      { label: 'Personas', icon: 'pi pi-fw pi-user', routerLink: ['personas'] },
      
    ];
  }

}



