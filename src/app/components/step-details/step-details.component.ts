import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { Step, Action, Message } from "../../models/step";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { Configservice } from "src/app/services/configuration.service";
import { StepActionType } from "../../models/actionTypes";
@Component({
  selector: 'app-step-details',
  templateUrl: './step-details.component.html',
  styleUrls: ['./step-details.component.scss']
})
export class StepDetailsComponent implements OnInit {
  @ViewChild("actioncontent", { static: false }) addAction: any;
  @ViewChild("messagecontent", { static: false }) messagecontent: any;
  public selectedMessageIndex: number;
  public selectedActionIndex: number;
  public selectedStep: Step;
  public actionForm: FormGroup;
  public messageForm: FormGroup;
  public actionTypes: any;
  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public configurationService: Configservice,
    private config: NgbModalConfig,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) {
    this.config.backdrop = "static";
    this.config.keyboard = false;
  }

  ngOnInit() {
    this.selectedActionIndex = -1;
    this.selectedMessageIndex = -1;
    this.actionTypes = StepActionType;
    let id=this.activatedRoute.snapshot.params['id'];
      this.selectedStep=this.configurationService.getStepDetails(id);
      if(!this.selectedStep){
        this.router.navigate(['/steps'])
      }
    this.initializeActionForm();
    this.intializeMessageForm();
  }

  private intializeMessageForm(argMessage: string = null): void {
    argMessage = argMessage || "";
    this.messageForm = this.fb.group({
      text: new FormControl(
        argMessage,
        Validators.compose([Validators.required])
      )
    });
  } // private intializeMessageForm(argMessage:Message=null): void

  private initializeActionForm(argActionValue: Action = null) {
    const actionName = !argActionValue? "": argActionValue.name? argActionValue.name: "";
    const isTemplate = !argActionValue? false: argActionValue.message.isTemplate? argActionValue.message.isTemplate: "";
    const message = !argActionValue ? "": argActionValue.message.isTemplate? argActionValue.message.texts[0]: "";
    this.actionForm = this.fb.group({
        name: new FormControl(actionName,Validators.compose([Validators.required])),
        isTemplate: new FormControl(isTemplate),
        message: new FormControl(message)
    });
  }


  public openAddNewAction():void {
    this.modalService.open(this.addAction, { centered: true });
  }// public openAddNewAction():void

  public addnewaction(): void {
    if (this.selectedActionIndex == -1) {
      let message: Message = new Message([], this.actionForm.value.isTemplate);
      if (message.isTemplate) {
        message.texts.push(this.actionForm.value.message);
      }
      let newAction: Action = new Action(this.actionForm.value.name, message);
      this.selectedStep.actions.push(newAction);
    } else {
      this.selectedStep.actions[this.selectedActionIndex].name = this.actionForm.value.name;
      this.selectedStep.actions[this.selectedActionIndex].message.isTemplate = this.actionForm.value.isTemplate;
      this.selectedActionIndex = -1;
    }
    this.modalService.dismissAll();
    this.initializeActionForm();
  } // public addnewaction(): void

  public openAddNewMessage(argActionIndex: number): void {
    this.selectedActionIndex = argActionIndex;
    this.modalService.open(this.messagecontent, { centered: true });
  } // public openAddNewMessage():void

  public addNewMessage(): void {
    if (this.selectedMessageIndex !== -1 && this.selectedActionIndex !== -1) {
      this.selectedStep.actions[this.selectedActionIndex].message.texts[
        this.selectedMessageIndex
      ] = this.messageForm.value.text;
    } else {
      this.selectedStep.actions[this.selectedActionIndex].message.texts.push(
        this.messageForm.value.text
      );
    }
    this.modalService.dismissAll();
    this.selectedActionIndex = -1;
    this.selectedMessageIndex = -1;
    this.intializeMessageForm();
  } // public addNewMessage(): void

  public getMessageText(argtext): string {
    argtext = argtext.split("_*").join("<b>");
    argtext = argtext.split("*_").join("</b>");
    let lines=argtext.split('\\n');
    let outGoingMessage='';
    lines.map(line=>{
      outGoingMessage += `<div>${line} &nbsp; </div>`;
    })
    return outGoingMessage;
  } // public getMessageText(argtext)

  public savestep(): void {
    this.configurationService.saveStep(this.selectedStep);
    alert(`Successfully saved ${this.selectedStep.name}`);
  } // public savestep(): void

  public editAction(argIndex): void {
    this.selectedActionIndex = argIndex;
    this.initializeActionForm(
      this.selectedStep.actions[this.selectedActionIndex]
    );
    this.openAddNewAction();
  } // public editAction(argIndex):void

  public closeActionModal(): void {
    this.modalService.dismissAll();
    this.selectedActionIndex = -1;
    this.initializeActionForm();
  } // public closeActionModal(): void

  public deletemessage(action: Action, index: number): void {
    action.message.texts.splice(index, 1);
  } // public deletemessage(action:Action,index:number):void

  public editMessage(argMessageIndex, argActionIndex): void {
    this.selectedMessageIndex = argMessageIndex;
    this.selectedActionIndex = argActionIndex;
    this.intializeMessageForm(
      this.selectedStep.actions[argActionIndex].message.texts[argMessageIndex]
    );
    this.openAddNewMessage(argActionIndex);
  } // public editMessage(argMessageIndex,argActionIndex): void

  public deleteAction(argIndex:number){
    this.selectedStep.actions.splice(argIndex,1);
  }
}
