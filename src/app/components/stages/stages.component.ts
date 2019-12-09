import { Component, OnInit, ViewChild } from '@angular/core';
import { Configservice } from '../../services/configuration.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Stage } from '../../models/stage';
import { Step } from '../../models/step';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.scss']
})
export class StagesComponent implements OnInit {
@ViewChild('stagecontent',{static:true}) stageContent:any;
public stageForm:FormGroup;
public listOfStages:Stage[];
public selectedStageIndex:number;
public selectedStage:Stage;
public listOfSteps:Step[];
subs = new Subscription();
  constructor(private modalService: NgbModal, private fb: FormBuilder,
              public configurationService:Configservice,private router:Router) {
  }

  ngOnInit() {
    this.listOfStages=this.configurationService.getStages();
    this.selectedStage=null;
    this.initalizeStageForm();
  }


  private initalizeStageForm():void{
    this.stageForm=this.fb.group({
      name: new FormControl("", Validators.compose([Validators.required]))
    });
  }// private initalizeStageForm():void

  public openAddNewStage():void{
      this.modalService.open(this.stageContent,{ centered: true })
  }// public openAddNewStage():void

  public AddnewStage():void{
      let newStage:Stage=new Stage(this.stageForm.value.name,[]);
      this.configurationService.createNewStage(newStage);
      this.listOfStages=this.configurationService.getStages();
      this.modalService.dismissAll();
      this.initalizeStageForm();
  }// public AddnewStage():void

  public deleteStage(argIndex:number):void{
    const confirmation=confirm(`Are you sure you want to delte ${this.listOfStages[argIndex].name}`);
    if(confirmation){
      this.configurationService.deleteStage(argIndex);
      this.listOfStages=this.configurationService.getStages();
    }
  }// public deleteStage(argIndex:number):void

  public editStage(argStageId:string):void{
      this.router.navigate(['/stage',argStageId]);
  }// public editStage(argStageId:string):void

}
