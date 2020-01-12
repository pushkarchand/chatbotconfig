import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router:Router) { }

  ngOnInit() {

  }

  public navigate(argPath:string){
    this.router.navigate([`/${argPath}`]);
  } 

}
