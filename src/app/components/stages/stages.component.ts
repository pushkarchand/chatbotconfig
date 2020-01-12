import { Component, OnInit, ViewChild } from '@angular/core';
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
import { StageService } from '../../services/stage.service';

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
              private router:Router,private _stageService:StageService) {
  }

  ngOnInit() {
    this.listOfStages=[];
    this.enumerateStages();
    this.selectedStage=null;
    this.initalizeStageForm();
  }

  private enumerateStages():void{
      this._stageService.enumerateStages()
      .subscribe(stagesList=>{
        this.listOfStages=stagesList;
      })
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
     this._stageService.createStage(newStage)
     .subscribe(stageResponse=>{
        this.enumerateStages();
        this.modalService.dismissAll();
        this.initalizeStageForm();
     })
  }// public AddnewStage():void

  public deleteStage(argIndex:number):void{
    const confirmation=confirm(`Are you sure you want to delte ${this.listOfStages[argIndex].name}`);
    if(confirmation){
      const stageId=this.listOfStages[argIndex]._id;
      this._stageService.deleteStage(stageId)
        .subscribe(response=>{
          this.enumerateStages();
        })
    }
  }// public deleteStage(argIndex:number):void

  public editStage(argStageId:string):void{
      this.router.navigate(['/stage',argStageId]);
  }// public editStage(argStageId:string):void

}
