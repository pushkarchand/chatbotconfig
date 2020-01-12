import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { Step } from '../../models/step';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from '@angular/router';
import { StepService } from '../../services/step.service';

@Component({
  selector: "app-steps",
  templateUrl: "./steps.component.html",
  styleUrls: ["./steps.component.scss"]
})
export class StepsComponent implements OnInit {
  @ViewChild("content", { static: false }) newStep: any;
  public listOfSteps: Step[];
  public selectedStepIndex: number;
  public stepForm: FormGroup;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    private config: NgbModalConfig,
    private router: Router,
    private _setpService:StepService
  ) {
    this.config.backdrop = "static";
    this.config.keyboard = false;
  }

  ngOnInit() {
    this.initializeStepForm();
    this.enumerateSteps();
  }

  private enumerateSteps():void{
    this.listOfSteps=[];
    this._setpService.enumerateSteps()
    .subscribe(data=>{
      this.listOfSteps=data;
    })
  }

  private initializeStepForm() : void {
    this.stepForm = this.fb.group({
      name: new FormControl('', Validators.compose([Validators.required]))
    });
  }// private initializeStepForm(argStep:Step=null) : void


  public openAddNewStep(): void {
    this.modalService.open(this.newStep, { centered: true });
  } // public openAddNewStep(content): void

  public addnewStep(): void {
    let newStep: Step = new Step(this.stepForm.value.name, []);
    this._setpService.createStep(newStep)
      .subscribe(stepResponse=>{
          this.enumerateSteps();
      })
    this.modalService.dismissAll();
    this.initializeStepForm();
  } // public addnewStep(): void

  public editStep(argStepId:string):void{
    this.router.navigate(['/step/',argStepId]);
  }

  public deleteStep(argIndex:number):void{
    const response=confirm(`Are you sure do you want to delete ${this.listOfSteps[argIndex].name} step`);
    if(response){
        let stepId=this.listOfSteps[argIndex]._id;
        this._setpService.deleteStep(stepId)
        .subscribe(stepResponse=>{
          this.enumerateSteps();
        })
    }
    
  }// public deleteStep(argIndex:number):void

}
