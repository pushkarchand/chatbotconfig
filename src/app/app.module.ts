import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { DragulaModule } from 'ng2-dragula';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FlowsComponent } from './components/flows/flows.component';
import { FlowComponent } from './components/flow/flow.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { StepsComponent } from './components/steps/steps.component';
import { StagesComponent } from './components/stages/stages.component';
import{StepFilterByNamePipe} from './pipes/steppipe';
import { StageDetailsComponent } from './components/stage-details/stage-details.component';
import { StepDetailsComponent } from './components/step-details/step-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { HttpClientModule } from '@angular/common/http';
import { FlowService } from './services/flow.service';
import { StageService } from './services/stage.service';
import { StepService } from './services/step.service';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    FlowsComponent,
    FlowComponent,
    StepsComponent,
    StagesComponent,
    StepFilterByNamePipe,
    StageDetailsComponent,
    StepDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    DragulaModule.forRoot(),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    HttpClientModule
  ],
  providers: [StageService,StepService,FlowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
