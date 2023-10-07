import { Component } from '@angular/core';
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  username: string;
  password: string;

  constructor(private globals: Globals,private router: Router) { }

  login() {
    if (this.username === 'usuario' && this.password === 'contrasena') {
      this.globals.vLoggeado = true;
      this.router.navigate(['/celula'])
    } else {
      console.log("logeate bien")
    }
  }

}
