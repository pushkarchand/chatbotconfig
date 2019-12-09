import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlowComponent } from './components/flow/flow.component';
import { FlowsComponent } from './components/flows/flows.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { StepsComponent } from './components/steps/steps.component';
import { StagesComponent } from './components/stages/stages.component';
import { StepDetailsComponent } from './components/step-details/step-details.component';
import { StageDetailsComponent } from './components/stage-details/stage-details.component';

const routes: Routes = [
  {path:'',component:LandingPageComponent},
  {path:'step/:id',component:StepDetailsComponent},
  {path:'steps',component:StepsComponent},
  {path:'stages',component:StagesComponent},
  {path:'stage/:id',component:StageDetailsComponent},
  {path:'flow/:id',component:FlowComponent},
  {path:'flows',component:FlowsComponent},
  {path:'*',component:LandingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
