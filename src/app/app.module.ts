import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';

//primeng
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';

import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToolbarModule } from 'primeng/toolbar';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ProgressBarModule} from 'primeng/progressbar';
import { MessageService } from 'primeng/api';
import {KnobModule} from 'primeng/knob';
//

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { TareaComponent } from './tarea/tarea.component';
import { PersonaComponent } from './persona/persona.component';

import { TareaService } from './tarea/tarea.service';
import { PersonaService } from './persona/persona.service';
import { SubTareaService } from './subtarea/subtarea.service';

import { Globals } from './globals';
import { CelulaComponent } from './celula/celula.component';
import { SubtareaComponent } from './subtarea/subtarea.component';
import { VarSubTarea } from './subtarea/varSubtarea';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TareaComponent,
    PersonaComponent,
    CelulaComponent,
    SubtareaComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    TabMenuModule,
    RatingModule,
    DropdownModule,
    ToastModule,
    DialogModule,
    MultiSelectModule,
    ToolbarModule,
    InputTextModule,
    InputNumberModule,
    AutoCompleteModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    KnobModule,
    CalendarModule,
    InputTextareaModule


  ],
  providers: [TareaService,PersonaService,SubTareaService,Globals,MessageService,VarSubTarea],
  bootstrap: [AppComponent]
})
export class AppModule { }
