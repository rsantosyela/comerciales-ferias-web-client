import { Component, OnInit } from '@angular/core';
import { Fair } from '../../models/fair';
import { FairService } from '../../services/fair.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-fairs',
  templateUrl: './fairs.component.html',
  styleUrls: ['./fairs.component.css'],
  providers: [FairService]
})
export class FairsComponent implements OnInit {
  public fair: Fair;
  public fairId: string;
  public fairs: Array<Fair>;

  public newFairName: string;
  public newFairLocation: string;
  public newFairDescription: string;

  //public showFormError: boolean;

  public fairForm: FormGroup;
  
  private defaultValuesFairForm = () => {
    return {
      name: ['', Validators.required],
      location: ['', Validators.required],
      description: ['', Validators.required],
    };
  }

  settings = {
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false,
      custom: [
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
      location: {
        title: 'Localización'
      },
      description: {
        title: 'Descripción',
      },
    },
    noDataMessage: "No hay ferias registradas"
  };
  
  constructor(
    private _fairService : FairService, 
    private _router: Router,
    private _route: ActivatedRoute,
    private ngxSmartModalService: NgxSmartModalService
  ) { 
    this.fair = new Fair("","","","");
    //this.showFormError = false;
  }

  ngOnInit(){
    this.getFairs();
    this.resetControllers();   
  }

  resetControllers(){
    this.fairForm = new FormBuilder().group(this.defaultValuesFairForm());
  }
  
  customActions(event){
    this.fair = event.data;
    switch (event.action) {
 
      case "editAction":
        this.fairForm.setValue({
          name: this.fair.name,
          location: this.fair.location,
          description: this.fair.description 
        });
        this.ngxSmartModalService.getModal("updateFairModal").open();
      break;
      
      case "deleteAction":
        this.ngxSmartModalService.getModal("deleteFairModal").open();
      break;
      
      default:

      break;
    }
  }
  
  reload(){
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate(['ferias']);
  }
     
  getFairs(){
    this._fairService.getFairs().subscribe(
      response => {
        this.fairs = response.fairs;
        console.log(response);
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  startNewFairModal(){
    this.ngxSmartModalService.getModal("createFairModal").open();
  }

  createFair(){
    this.fair = new Fair("","","","");
    this.fair.name = this.fairForm.value.name;
    this.fair.location = this.fairForm.value.location;
    this.fair.description = this.fairForm.value.description;
    this._fairService.createFair(this.fair).subscribe(
      response => {
        console.log(response);
        this.ngxSmartModalService.getModal("createFairModal").close();
      },
      error => {
        console.log(<any>error);
      }
    );
  }

  closeDeleteFairModal(){
    this.ngxSmartModalService.getModal("deleteFairModal").close();
  }

  updateFair(){
    this.fair.name = this.fairForm.value.name;
    this.fair.location = this.fairForm.value.location;
    this.fair.description = this.fairForm.value.description;
    this._fairService.updateFair(this.fair).subscribe(
      response => {
        console.log(response);
        this.ngxSmartModalService.getModal("updateFairModal").close();  
      },
      error => {
        console.log(<any>error);
      }
    );
  } 

  deleteFair(id){
    this._fairService.deleteFair(id).subscribe(
      response => {
        console.log(response);
        this.ngxSmartModalService.getModal("deleteFairModal").close();      
      },
      error => {
        console.log(<any>error);
      }
    );    
  }
}
