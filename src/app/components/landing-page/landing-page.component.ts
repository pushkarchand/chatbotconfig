import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Configservice } from '../../services/configuration.service';
import { Step } from '../../models/step';
import { Stage } from '../../models/stage';
import { Flow } from '../../models/flow';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  public steps:Step[];
  public stages:Stage[];
  public flows:Flow[];
  constructor(private router:Router,public configurationService:Configservice) { }

  ngOnInit() {
    this.steps=this.configurationService.getSteps();
    this.stages=this.configurationService.getStages();
    this.flows=this.configurationService.getFlows();
  }

  public navigate(argPath:string){
    this.router.navigate([`/${argPath}`]);
  } 

}
