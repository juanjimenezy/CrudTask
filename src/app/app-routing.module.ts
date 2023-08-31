import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CelulaComponent } from './celula/celula.component';
import { HomeComponent } from './home/home.component';
import { PersonaComponent } from './persona/persona.component';
import { TareaComponent } from './tarea/tarea.component';




const routes: Routes = [
  {path: '', redirectTo: './home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'tareas', component: TareaComponent},
  {path: 'personas', component: PersonaComponent},
  {path: 'celula', component: CelulaComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
