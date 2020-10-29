import { Component, OnInit } from '@angular/core';
import { CommercialAgent } from '../../models/commercial-agent';
import { CommercialAgentService } from '../../services/commercial.agent.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-commercial-agents',
  templateUrl: './commercial-agents.component.html',
  styleUrls: ['./commercial-agents.component.css'],
  providers: [ CommercialAgentService ]
})
export class CommercialAgentsComponent implements OnInit {
  public commercial_agent: CommercialAgent;
  public commercial_agents: Array<CommercialAgent>;
  public newPassword: string;

  public newCommercialAgentName: string;
  public newCommercialAgentEmail: string;
  public newCommercialAgentPassword: string;

  public commercialAgentForm: FormGroup;

  private defaultValuesCommercialAgentForm = () => {
    return {
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    };
  }
     
  settings = {
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'resetAction', title: '<i class="btn-reset">Cambiar contraseña</i>'},
        { name: 'editAction', title: '<i class="btn-edit">Editar</i>'},
        { name: 'deleteAction', title: '<i class="btn-delete">Eliminar</i>'},    
      ],
      position: 'right',
    },    
    columns: {
      name: {
        title: 'Nombre',
        sortDirection: 'asc'
      },
      email: {
        title: 'Correo electrónico'
      },
    },
    noDataMessage: "No hay comerciales registrados"
  };

  constructor(
    private _commercialAgentService: CommercialAgentService,
    private _router: Router,
    private _route: ActivatedRoute,
    private ngxSmartModalService: NgxSmartModalService
  ){
    this.commercial_agent = new CommercialAgent("","","","");
  }

  ngOnInit(){
    this.getCommercialAgents();
    this.resetControllers();
  }

  resetControllers(){
    this.commercialAgentForm = new FormBuilder().group(this.defaultValuesCommercialAgentForm());
  }

  customActions(event){
    this.commercial_agent = event.data;
    switch (event.action) {
 
      case "editAction":
        this.commercialAgentForm.setValue({
          name: this.commercial_agent.name,
          email: this.commercial_agent.email,
          password: this.commercial_agent.password 
        });
        this.ngxSmartModalService.getModal("updateCommercialAgentModal").open();
      break;

      case "resetAction":
        this.commercialAgentForm.setValue({
          name: this.commercial_agent.name,
          email: this.commercial_agent.email,
          password: ""
        });
        this.ngxSmartModalService.getModal("updatePasswordModal").open();
      break;

      case "deleteAction":
        this.ngxSmartModalService.getModal("deleteCommercialAgentModal").open();
      break;
      
      default:

      break;
    }
  }
   
  reload(){
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['agentes-comerciales']);
  }
  
  getCommercialAgents(){

    this._commercialAgentService.getCommercialAgents().subscribe(
      response => {
        this.commercial_agents = response.commercialAgents;
      },
      error => {
        console.log(error);
      }
    );
  }

  updateCommercialAgent(){

    this.commercial_agent.name = this.commercialAgentForm.value.name;
    this.commercial_agent.email = this.commercialAgentForm.value.email;

    this._commercialAgentService.updateCommercialAgent(this.commercial_agent).subscribe(
      response => {
        window.location.reload();
        console.log(response);  
        this.ngxSmartModalService.getModal("updateCommercialAgentModal").close();    
      },
      error => {
        console.log(<any>error);
      }
    );
  } 

  updatePassword(){
    //console.log(this.commercial_agent);

    this.commercial_agent.password = this.commercialAgentForm.value.password;

    //this.commercial_agent.password = this.newPassword;
    console.log(this.commercial_agent);
    this._commercialAgentService.updateCommercialAgent(this.commercial_agent).subscribe(
      response => {
        console.log(response);
        this.ngxSmartModalService.getModal("updatePasswordModal").close();
      },
      error => {
        console.log(<any>error);
      }
    );  
  }

  startNewCommercialAgentModal(){
    this.ngxSmartModalService.getModal("createCommercialAgentModal").open();
  }

  createCommercialAgent(){
    this.commercial_agent = new CommercialAgent("","","","");
    this.commercial_agent.name = this.commercialAgentForm.value.name;
    this.commercial_agent.email = this.commercialAgentForm.value.email;
    this.commercial_agent.password = this.commercialAgentForm.value.password;
    this._commercialAgentService.createCommercialAgent(this.commercial_agent).subscribe(
      response => {
        console.log(response);
        this.ngxSmartModalService.getModal("createCommercialAgentModal").close();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  closeDeleteCommercialAgentModal(){
    this.ngxSmartModalService.getModal("deleteUserModal").close();
  }

  deleteCommercialAgent(id){
    this._commercialAgentService.deleteCommercialAgent(id).subscribe(
      response => {
        console.log(response);    
        this.ngxSmartModalService.getModal("deleteCommercialAgentModal").close();    
      },
      error => {
        console.log(<any>error);
      }
    )    
  }
}
